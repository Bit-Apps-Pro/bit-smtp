<?php

namespace BitApps\SMTP\Providers;

use BitApps\SMTP\Config;
use BitApps\SMTP\Deps\BitApps\WPKit\Hooks\Hooks;
use BitApps\SMTP\Deps\BitApps\WPKit\Http\RequestType;
use BitApps\SMTP\Deps\BitApps\WPKit\Http\Router\Router;
use BitApps\SMTP\HTTP\Controllers\TelemetryPopupController;
use BitApps\SMTP\Plugin;

class HookProvider
{
    private $_pluginBackend;

    public function __construct()
    {
        $this->_pluginBackend = Config::get('BASEDIR') . DIRECTORY_SEPARATOR;
        $this->loadAppHooks();
        Hooks::addAction('phpmailer_init', [$this, 'mailConfig'], 1000);
        Hooks::addAction('rest_api_init', [$this, 'loadApi']);
        Hooks::addFilter(Config::VAR_PREFIX . 'telemetry_additional_data', [new TelemetryPopupController(), 'filterTrackingData']);
    }

    /**
     * Loads API routes.
     */
    public function loadApi()
    {
        if (
            is_readable($this->_pluginBackend . 'hooks' . DIRECTORY_SEPARATOR . 'api.php')
            && RequestType::is(RequestType::API)
        ) {
            $router = new Router(RequestType::API, Config::SLUG, 'v1');

            include $this->_pluginBackend . 'hooks' . DIRECTORY_SEPARATOR . 'api.php';
            $router->register();
        }
    }

    public function mailConfig($phpmailer)
    {
        $mailConfig = get_option(Config::VAR_PREFIX . 'options');

        if (\is_array($mailConfig)) {
            if ($mailConfig['status'] == 1) {
                $phpmailer->Mailer   = 'smtp';
                $phpmailer->Host     = $mailConfig['smtp_host'];
                $phpmailer->SMTPAuth = true;
                if (!empty($mailConfig['re_email_address'])) {
                    $phpmailer->addReplyTo($mailConfig['re_email_address'], 'Information');
                }
                $phpmailer->Port       = $mailConfig['port'];
                $phpmailer->Username   = $mailConfig['smtp_user_name'];
                $phpmailer->Password   = $mailConfig['smtp_password'];
                $phpmailer->SMTPSecure = $mailConfig['encryption'];
                $phpmailer->SMTPDebug  = isset($mailConfig['smtp_debug']) ? $mailConfig['smtp_debug'] : 0;
                $phpmailer->From       = $mailConfig['form_email_address'];
                $phpmailer->FromName   = $mailConfig['form_name'];
            }
        }
    }

    /**
     * Helps to register App hooks.
     */
    protected function loadAppHooks()
    {
        if (
            RequestType::is(RequestType::AJAX)
            && is_readable($this->_pluginBackend . 'hooks' . DIRECTORY_SEPARATOR . 'ajax.php')
        ) {
            $router = new Router(RequestType::AJAX, Config::VAR_PREFIX, '');
            $router->setMiddlewares(Plugin::instance()->middlewares());
            include $this->_pluginBackend . 'hooks' . DIRECTORY_SEPARATOR . 'ajax.php';
            $router->register();
        }

        if (is_readable($this->_pluginBackend . 'hooks.php')) {
            include $this->_pluginBackend . 'hooks.php';
        }
    }
}
