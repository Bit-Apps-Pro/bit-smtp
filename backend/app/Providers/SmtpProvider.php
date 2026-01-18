<?php

namespace BitApps\SMTP\Providers;

use BitApps\SMTP\Deps\BitApps\WPKit\Hooks\Hooks;
use BitApps\SMTP\Model\Log;
use BitApps\SMTP\Plugin;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use WP_Error;

class SmtpProvider
{
    private const MEMORY_THRESHOLD = 104857600; // 100MB

    private array $debugOutput = [];

    private bool $debug = false;

    private bool $isFailed = false;

    private bool $isRetrying = false;

    private int $retryLogId = 0;

    private bool $isBatchProcessing = false;

    /**
     * @var array<int,array{status: string, data: array|WP_Error}>
     *
     *  */
    private array $pendingLogs = [];

    public function __construct()
    {
        Hooks::addAction('phpmailer_init', [$this, 'configureMailer'], 1000);

        if (Plugin::instance()->logger()->isEnabled()) {
            /**
             * We only log mails when logging is enabled, to avoid unnecessary overhead
             */
            Hooks::addAction('wp_mail_succeeded', [$this, 'logMailSuccess']);
            Hooks::addAction('wp_mail_failed', [$this, 'logMailFailed']);
        }
        /**
         * don't need this, since we use phpmailer_int, which is invoked before mail actually sent and away before wp_mail_from filter
         *
         * @see wp-includes/pluggable.php > wp_mail() method
         */
        // Hooks::addFilter('wp_mail_from', [$this, 'filterEnvelopeFrom']);
    }

    /**
     * Ensure any remaining logs are saved
     */
    public function __destruct()
    {
        $this->flushPendingLogs();
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

    public function setBatch(bool $status): self
    {
        $this->isBatchProcessing = $status;

        return $this;
    }

    public function configureMailer(PHPMailer $mailer)
    {
        $mailConfig = Plugin::instance()->mailConfigService()->load();

        if ($mailConfig->isEnabled() && $mailConfig->getSmtpHost()) {
            $mailer->Mailer      = 'smtp';
            $mailer->Host        = $mailConfig->getSmtpHost();
            $mailer->Port        = $mailConfig->getPort();
            if ($mailConfig->isSmtpAuth()) {
                $mailer->SMTPAuth    = true;
                $mailer->Username    = $mailConfig->getSmtpUserName();
                // $mailer->Password    = $mailConfig->getSmtpPassword();
                $mailer->Password    = '';
            }
            if ($mailConfig->hasReplyAddress()) {
                $mailer->addReplyTo($mailConfig->getReEmailAddress());
            }

            if ($mailConfig->isEncryptionEnabled()) {
                $mailer->SMTPSecure  = $mailConfig->getEncryption();
            }

            error_log(print_r(['conf' => $mailConfig->getAll()], true));
            if ($mailConfig->hasFromAddress()) {
                $mailer->setFrom(
                    $mailConfig->getFromEmailAddress(),
                    $mailConfig->getFromName()
                );
                $mailer->Sender = $mailConfig->getFromEmailAddress();
            }
        }

        if ($this->debug || $mailConfig->isSmtpDebug()) {
            /**
             * We set SMTP debug level to CONNECTION to capture all debug info to provide better insights on test mail failures
             */
            $mailer->SMTPDebug   = SMTP::DEBUG_CONNECTION;
            $mailer->Debugoutput = [$this, 'setDebugOutput'];
        }
    }

    public function filterEnvelopeFrom($previousEnvelopFrom)
    {
        $mailConfig          = Plugin::instance()->mailConfigService()->load();
        $updatedEnvelopeFrom = $previousEnvelopFrom;
        if ($mailConfig->hasFromAddress() && $mailConfig->getFromEmailAddress() !== $previousEnvelopFrom) {
            $updatedEnvelopeFrom = $mailConfig->getFromEmailAddress();
        }

        return $updatedEnvelopeFrom;
    }

    public function logMailSuccess($mailData)
    {
        if ($this->isRetrying() && $this->retryLogId > 0) {
            Plugin::instance()->logger()->update($this->retryLogId, Log::SUCCESS, $mailData);
        } else {
            $this->pendingLogs[] = [
                'status' => Log::SUCCESS,
                'data'   => $mailData
            ];

            if ($this->shouldFlushLogs()) {
                $this->flushPendingLogs();
            }
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
            Plugin::instance()->logger()->update($this->retryLogId, Log::ERROR, $error->get_error_data(), $error->get_error_messages());
        } else {
            $this->pendingLogs[] = [
                'status' => Log::ERROR,
                'data'   => $error
            ];

            if ($this->shouldFlushLogs()) {
                $this->flushPendingLogs();
            }
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

    /**
     * Check if available memory is below threshold
     */
    private function shouldFlushLogs(): bool
    {
        if ($this->isBatchProcessing === false) {
            return true;
        }

        $limit = \ini_get('memory_limit');
        if ($limit === '-1') {
            return false;
        }

        $limit = $this->getBytes($limit);
        $used  = memory_get_usage(true);

        return ($limit - $used) < self::MEMORY_THRESHOLD || self::MEMORY_THRESHOLD > $limit;
    }

    /**
     * Convert PHP memory limit string to bytes
     */
    private function getBytes(string $val): int
    {
        $val  = trim($val);
        $last = strtolower($val[\strlen($val) - 1]);
        $val  = (int) $val;

        switch ($last) {
            case 'g':
                $val *= 1024;
                // no break
            case 'm':
                $val *= 1024;
                // no break
            case 'k':
                $val *= 1024;
        }

        return $val;
    }

    /**
     * Bulk insert pending logs and clear the queue
     */
    private function flushPendingLogs(): void
    {
        if (empty($this->pendingLogs)) {
            return;
        }

        Plugin::instance()->logger()->bulkInsert($this->pendingLogs);
        $this->pendingLogs = [];
    }
}
