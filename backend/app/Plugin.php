<?php

namespace BitApps\SMTP;

/*
 * Main class for the plugin.
 *
 * @since 1.0.0-alpha
 */

use BitApps\SMTP\Deps\BitApps\WPKit\Hooks\Hooks;
use BitApps\SMTP\Deps\BitApps\WPKit\Http\RequestType;
use BitApps\SMTP\Deps\BitApps\WPKit\Migration\MigrationHelper;
use BitApps\SMTP\Deps\BitApps\WPKit\Utils\Capabilities;
use BitApps\SMTP\Deps\BitApps\WPTelemetry\Telemetry\Telemetry;
use BitApps\SMTP\Deps\BitApps\WPTelemetry\Telemetry\TelemetryConfig;
use BitApps\SMTP\HTTP\Middleware\NonceCheckerMiddleware;
use BitApps\SMTP\Providers\HookProvider;
use BitApps\SMTP\Providers\InstallerProvider;
use BitApps\SMTP\Views\Layout;

final class Plugin
{
    /**
     * Main instance of the plugin.
     *
     * @since 1.0.0-alpha
     *
     * @var null|Plugin
     */
    private static $_instance;

    private $_registeredMiddleware = [];

    /**
     * Initialize the Plugin with hooks.
     */
    public function __construct()
    {
        $this->registerInstaller();
        Hooks::addAction('plugins_loaded', [$this, 'loaded']);

        $this->initWPTelemetry();
    }

    public function registerInstaller()
    {
        $installerProvider = new InstallerProvider();
        $installerProvider->register();
    }

    /**
     * Load the plugin.
     */
    public function loaded()
    {
        Hooks::doAction(Config::withPrefix('loaded'));
        Hooks::addAction('init', [$this, 'registerProviders'], 11);
        Hooks::addFilter('plugin_action_links_' . Config::get('BASENAME'), [$this, 'actionLinks']);
        $this->maybeMigrateDB();
    }

    public function middlewares()
    {
        return [
            'nonce' => NonceCheckerMiddleware::class,
        ];
    }

    public function getMiddleware($name)
    {
        if (isset($this->_registeredMiddleware[$name])) {
            return $this->_registeredMiddleware[$name];
        }

        $middlewares = $this->middlewares();
        if (isset($middlewares[$name]) && class_exists($middlewares[$name]) && method_exists($middlewares[$name], 'handle')) {
            $this->_registeredMiddleware[$name] = new $middlewares[$name]();
        } else {
            return false;
        }

        return $this->_registeredMiddleware[$name];
    }

    /**
     * Instantiate the Provider class.
     */
    public function registerProviders()
    {
        if (RequestType::is('admin')) {
            new Layout();
        }

        new HookProvider();
    }

    /**
     * Plugin action links.
     *
     * @param array $links Array of links
     *
     * @return array
     */
    public function actionLinks($links)
    {
        $linksToAdd = Config::get('PLUGIN_PAGE_LINKS');
        foreach ($linksToAdd as $link) {
            $links[] = '<a href="' . $link['url'] . '">' . $link['title'] . '</a>';
        }

        return $links;
    }

    public static function maybeMigrateDB()
    {
        if (!Capabilities::check('manage_options')) {
            return;
        }

        if (version_compare(Config::getOption('db_version'), Config::DB_VERSION, '<')) {
            MigrationHelper::migrate(InstallerProvider::migration());
        }
    }

    /**
     * Retrieves the main instance of the plugin.
     *
     * @since 1.0.0-alpha
     *
     * @return Plugin plugin main instance
     */
    public static function instance()
    {
        return static::$_instance;
    }

    /**
     * Loads the plugin main instance and initializes it.
     *
     * @return bool True if the plugin main instance could be loaded, false otherwise
     *
     * @since 1.0.0-alpha
     */
    public static function load()
    {
        if (static::$_instance !== null) {
            return false;
        }

        static::$_instance = new static();

        return true;
    }

    public function initWPTelemetry()
    {
        TelemetryConfig::setSlug(Config::SLUG);
        TelemetryConfig::setTitle(Config::TITLE);
        TelemetryConfig::setVersion(Config::VERSION);
        TelemetryConfig::setPrefix(Config::VAR_PREFIX);

        TelemetryConfig::setServerBaseUrl('https://wp-api.bitapps.pro/public/');
        TelemetryConfig::setTermsUrl('https://bitapps.pro/terms-of-service/');
        TelemetryConfig::setPolicyUrl('https://bitapps.pro/privacy-policy/');

        Telemetry::report()->addPluginData()->init();
        Telemetry::feedback()->init();
    }
}
