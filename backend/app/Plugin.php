<?php

namespace BitApps\BMI;

/*
 * Main class for the plugin.
 *
 * @since 1.0.0-alpha
 */

use BitApps\BMI\Core\Database\Operator as DBOperator;
use BitApps\BMI\Core\Hooks\Hooks;
use BitApps\BMI\Core\Http\RequestType;
use BitApps\BMI\Core\Utils\Capabilities;
use BitApps\BMI\HTTP\Middleware\NonceCheckerMiddleware;
use BitApps\BMI\Providers\HookProvider;
use BitApps\BMI\Providers\InstallerProvider;
use BitApps\BMI\Views\Layout;

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
        Hooks::addAction('phpmailer_init', [$this, 'mailConfig']);
    }

    public function mailConfig($phpmailer)
    {
        $mailConfig = get_option('bit_smtp_options');
        if (\is_array($mailConfig)) {
            if ($mailConfig['status'] == 1) {
                $phpmailer->Mailer     = 'smtp';
                $phpmailer->Host       = $mailConfig['smtp_host'];
                $phpmailer->SMTPAuth   = true;
                if (!empty($mailConfig['re_email_address'])) {
                    $phpmailer->addReplyTo($mailConfig['re_email_address'], 'Information');
                }
                $phpmailer->Port       = $mailConfig['port'];
                $phpmailer->Username   = $mailConfig['smtp_user_name'];
                $phpmailer->Password   = $mailConfig['smtp_password'];
                $phpmailer->SMTPSecure = $mailConfig['encryption'];
                $phpmailer->SMTPDebug  =  1;
                $phpmailer->From       = $mailConfig['form_email_address'];
                $phpmailer->FromName   = $mailConfig['form_name'];
            }
        }
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
            DBOperator::migrate(InstallerProvider::migration());
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
}
