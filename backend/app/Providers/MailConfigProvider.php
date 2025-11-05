<?php

namespace BitApps\SMTP\Providers;

use BitApps\SMTP\Config;
use BitApps\SMTP\Deps\BitApps\WPKit\Hooks\Hooks;
use BitApps\SMTP\Model\Log;
use BitApps\SMTP\Plugin;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use WP_Error;

class MailConfigProvider
{
    private array $debugOutput = [];

    private bool $debug = false;

    private bool $isFailed = false;

    private bool $isRetrying = false;

    private int $retryLogId = 0;

    public function __construct()
    {
        Hooks::addAction('phpmailer_init', [$this, 'mailConfig'], 1000);
        Hooks::addAction('wp_mail_succeeded', [$this, 'logMailSuccess']);
        Hooks::addAction('wp_mail_failed', [$this, 'logMailFailed']);
    }

    public function setDebug(bool $debug)
    {
        $this->debug = $debug;
    }

    public function isFailed(): bool
    {
        return $this->isFailed;
    }

    public function retry()
    {
        $this->isRetrying = true;

        return $this;
    }

    public function isRetrying(): bool
    {
        return $this->isRetrying;
    }

    public function setRetryLogId(int $logId)
    {
        $this->retryLogId = $logId;

        return $this;
    }

    public function mailConfig(PHPMailer $mailer)
    {
        $mailConfig = Config::getOption('options');

        if (\is_array($mailConfig) && $mailConfig['status'] == 1) {
            $mailer->Mailer   = 'smtp';
            $mailer->Host     = $mailConfig['smtp_host'];
            $mailer->SMTPAuth = true;
            if (!empty($mailConfig['re_email_address'])) {
                $mailer->addReplyTo($mailConfig['re_email_address']);
            }

            $mailer->Port        = $mailConfig['port'];
            $mailer->Username    = $mailConfig['smtp_user_name'];
            $mailer->Password    = $mailConfig['smtp_password'];
            $mailer->SMTPSecure  = $mailConfig['encryption'];

            if (\array_key_exists('form_email_address', $mailConfig) && !empty($mailConfig['form_email_address'])) {
                $mailer->setFrom(
                    $mailConfig['form_email_address'],
                    $mailConfig['form_name']
                );
            }
        }

        if ($this->debug || !empty($mailConfig['smtp_debug'])) {
            $mailer->SMTPDebug   = SMTP::DEBUG_CONNECTION;
            $mailer->Debugoutput = [$this, 'setDebugOutput'];
        }
    }

    public function logMailSuccess($mailData)
    {
        if ($this->isRetrying() && $this->retryLogId > 0) {
            Plugin::instance()->logger()->update($this->retryLogId, Log::SUCCESS, $mailData);
        } else {
            Plugin::instance()->logger()->success($mailData);
        }

        $this->isFailed   = false;
        $this->isRetrying = false;
    }

    public function logMailFailed(WP_Error $error)
    {
        if ($this->debug && $error->get_error_data()['phpmailer_exception_code'] == PHPMailer::STOP_CRITICAL) {
            $message = __('SMTP configuration is not correct. PHPMailer could not connect to the SMTP server', 'bit-smtp');
            $error->add('wp_mail_failed', $message, $error->get_error_data());
            $this->setDebugOutput($message, 0);
        }

        if ($this->isRetrying() && $this->retryLogId > 0) {
            Plugin::instance()->logger()->update($this->retryLogId, Log::SUCCESS, $error->get_error_data(), $error->get_error_messages());
        } else {
            Plugin::instance()->logger()->error($error);
        }

        $this->isFailed   = true;
        $this->isRetrying = false;
    }

    public function setDebugOutput($debugOutput, $debugLevel)
    {
        $this->debugOutput[] = $debugOutput . "\n";
    }

    public function getDebugOutput()
    {
        return $this->debugOutput;
    }
}
