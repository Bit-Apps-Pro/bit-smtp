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
        $this->_pluginBackend = Config::get('BACKEND_PATH') . DIRECTORY_SEPARATOR;
        $this->loadAppHooks();
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
            $router = new Router(RequestType::API, Config::SLUG, 'v' . Config::API_VERSION);

            include $this->_pluginBackend . 'hooks' . DIRECTORY_SEPARATOR . 'api.php';
            $router->register();
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
