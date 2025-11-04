<?php

namespace BitApps\SMTP\Providers;

use BitApps\SMTP\Config;
use BitApps\SMTP\Deps\BitApps\WPKit\Hooks\Hooks;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

class MailConfigProvider
{
    private static $_debugOutput = [];

    public function __construct()
    {
        Hooks::addAction('phpmailer_init', [$this, 'mailConfig'], 1000);
        Hooks::addAction('wp_mail_succeeded', [$this, 'logMailSuccess']);
        Hooks::addAction('wp_mail_failed', [$this, 'logMailFailed']);
    }

    public function mailConfig(PHPMailer $mailer)
    {
        $mailConfig = get_option(Config::VAR_PREFIX . 'options');

        if (\is_array($mailConfig)) {
            if ($mailConfig['status'] == 1) {
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
                $mailer->SMTPDebug   = SMTP::DEBUG_CONNECTION;
                $mailer->Debugoutput = [$this, 'setDebugOutput'];

                if (\array_key_exists('form_email_address', $mailConfig) && !empty($mailConfig['form_email_address'])) {
                    $mailer->setFrom(
                        $mailConfig['form_email_address'],
                        $mailConfig['form_name']
                    );
                }
            }
        }
    }

    public function logMailSuccess($mailData)
    {
        // Log successful email sending here
    }

    public function logMailFailed($mailData)
    {
        // Log failed email sending here
    }

    public static function setDebugOutput($debugOutput, $debugLevel)
    {
        self::$_debugOutput[] = $debugOutput . "\n";
    }

    public static function getDebugOutput()
    {
        return self::$_debugOutput;
    }
}
