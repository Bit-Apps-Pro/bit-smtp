<?php

namespace BitApps\SMTP\HTTP\Services;

use BitApps\SMTP\Config;
use BitApps\SMTP\Connectors\SmtpConfig;

/**
 * MailConfigService
 *
 * Provides explicit get/set/is methods for SMTP mail configuration stored under
 * Config::getOption('options') / Config::updateOption('options').
 */
class MailConfigService
{
    /**
     * @var SmtpConfig
     * */
    private $config;

    public function __construct()
    {
        $this->config = $this->load();
    }

    /**
     * Load options from persistent storage
     *
     * @return SmtpConfig
     */
    public function load()
    {
        if (!isset($this->config)) {
            $this->config = new SmtpConfig(Config::getOption('options', []));
        }

        return $this->config;
    }

    /**
     * Reload from storage and return self
     */
    public function reload(): self
    {
        unset($this->config);
        $this->load();

        return $this;
    }

    /**
     * Persist current in-memory options
     */
    public function store(): bool
    {
        return (bool) Config::updateOption('options', $this->config->getAll());
    }

    public function getProviders(): array
    {
        // TODO: implement different providers
        $providers            = [];
        $providers['default'] = $this->config;

        return $providers;
    }

    public function getViewOnlyConfig(string $provider = 'default'): array
    {
        $provider = $this->getProviders()[$provider] ?? $this->getProviders()['default'];

        return $this->config->getViewOnlyConfig();
    }
}
