<?php

namespace BitApps\SMTP\Connectors;

/**
 * MailConfigService
 *
 * Provides explicit get/set/is methods for SMTP mail configuration stored under
 * Config::getOption('options') / Config::updateOption('options').
 */
class SmtpConfig
{
    /**
     * @var array<string,mixed>
     */
    private array $options = [];

    public function __construct(array $options)
    {
        $this->options = $this->parseConfig($options);
    }

    /**
     * Load options from persistent storage
     *
     * @param $opts Configuration options
     *
     * @return array<string,mixed>
     */
    public function parseConfig(array $opts): array
    {
        if (\array_key_exists('form_name', $opts)) {
            $opts['from_name'] = $opts['form_name'];
        }

        if (\array_key_exists('form_email_address', $opts)) {
            $opts['from_email_address'] = $opts['form_email_address'];
        }

        unset($opts['form_email_address'], $opts['form_name']);

        if (\array_key_exists('status', $opts)) {
            $opts['status'] = $this->toBool($opts['status']);
        }

        if (\array_key_exists('smtp_auth', $opts)) {
            $opts['smtp_auth'] = $this->toBool($opts['smtp_auth']);
        }

        if (\array_key_exists('smtp_debug', $opts)) {
            $opts['smtp_debug'] = $this->toBool($opts['smtp_debug']);
        }

        return $opts;
    }

    public function getAll(): array
    {
        return $this->options;
    }

    public function get(string $key, $default = null)
    {
        return empty($this->options[$key]) ? $default : $this->options[$key];
    }

    public function set(string $key, $value): self
    {
        $this->options[$key] = $value;

        return $this;
    }

    public function setAll(array $opts): self
    {
        $this->options = array_replace($this->options, $opts);

        return $this;
    }

    public function setStatus($value): self
    {
        $this->set('status',  $this->toBool($value));

        return $this;
    }

    public function isEnabled(): bool
    {
        return $this->toBool($this->get('status', false));
    }

    public function hasFromAddress(): ?string
    {
        return !empty($this->get('from_email_address', null));
    }

    public function getFromEmailAddress(): ?string
    {
        return $this->get('from_email_address', null);
    }

    public function setFromEmailAddress(?string $value): self
    {
        $this->set('from_email_address', $value);

        return $this;
    }

    public function getFromName(): ?string
    {
        return $this->get('from_name', null);
    }

    public function setFromName(?string $value): self
    {
        $this->set('from_name', $value);

        return $this;
    }

    public function hasReplyAddress(): ?string
    {
        return !empty($this->get('re_email_address', null));
    }

    public function getReEmailAddress(): ?string
    {
        return $this->get('re_email_address', null);
    }

    public function setReEmailAddress(?string $value): self
    {
        $this->set('re_email_address', $value);

        return $this;
    }

    public function getSmtpHost(): ?string
    {
        return $this->get('smtp_host', null);
    }

    public function setSmtpHost(?string $value): self
    {
        $this->set('smtp_host', $value);

        return $this;
    }

    public function getEncryption(): string
    {
        return (string) ($this->get('encryption', 'none'));
    }

    public function setEncryption(string $value): self
    {
        $this->set('encryption', $value);

        return $this;
    }

    public function isEncryptionEnabled(): bool
    {
        return $this->get('encryption') !== 'none';
    }

    public function getPort(): int
    {
        return \intval($this->get('port', 0));
    }

    public function setPort($value): self
    {
        $this->set('port', \intval($value));

        return $this;
    }

    public function setSmtpAuth($value): self
    {
        $this->set('smtp_auth', $this->toBool($value));

        return $this;
    }

    public function isSmtpAuth(): bool
    {
        return $this->toBool($this->get('smtp_auth', false));
    }

    public function setSmtpDebug($value): self
    {
        $this->set('smtp_debug', $this->toBool($value));

        return $this;
    }

    public function isSmtpDebug(): bool
    {
        return $this->toBool($this->get('smtp_debug', false));
    }

    public function getSmtpUserName(): ?string
    {
        return $this->get('smtp_user_name', null);
    }

    public function setSmtpUserName(?string $value): self
    {
        $this->set('smtp_user_name', $value);

        return $this;
    }

    public function getSmtpPassword(): ?string
    {
        return $this->get('smtp_password', null);
    }

    public function setSmtpPassword(?string $value): self
    {
        $this->set('smtp_password', $value);

        return $this;
    }

    /**
     * Helper to convert various representations to boolean
     *
     * @param mixed $val
     */
    private function toBool($val): bool
    {
        return filter_var($val, FILTER_VALIDATE_BOOLEAN);
    }
}
