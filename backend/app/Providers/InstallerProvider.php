<?php

namespace BitApps\SMTP\Providers;

use BitApps\SMTP\Config;
use BitApps\WPKit\Hooks\Hooks;
use BitApps\WPKit\Installer;

class InstallerProvider
{
    private $_activateHook;

    private $_deactivateHook;

    private static $_uninstallHook;

    public function __construct()
    {
        register_activation_hook(Config::get('MAIN_FILE'), [$this, 'registerActivator']);
        register_deactivation_hook(Config::get('MAIN_FILE'), [$this, 'registerDeactivator']);
        $this->_activateHook   = Config::withPrefix('activate');
        $this->_deactivateHook = Config::withPrefix('deactivate');
        self::$_uninstallHook  = Config::withPrefix('uninstall');

        Hooks::addAction($this->_deactivateHook, [$this, 'deactivate']);

        // Only a static class method or function can be used in an uninstall hook.
        register_uninstall_hook(Config::get('MAIN_FILE'), [self::class, 'registerUninstaller']);
    }

    public function register()
    {
        $installer = new Installer(
            [
                'php'        => Config::REQUIRED_PHP_VERSION,
                'wp'         => Config::REQUIRED_WP_VERSION,
                'version'    => Config::VERSION,
                'oldVersion' => Config::getOption('version', '0.0'),
                'multisite'  => true,
                'basename'   => Config::get('BASENAME'),
            ],
            [
                'activate'  => $this->_activateHook,
                'uninstall' => self::$_uninstallHook,
            ],
            [

                'migration' => $this->migration(),
                'drop'      => $this->drop(),
            ]
        );
        $installer->register();
    }

    public function deactivate($networkWide)
    {
        // TODO: things to when plugin is deactivate
    }

    public function registerActivator($networkWide)
    {
        Hooks::doAction($this->_activateHook, $networkWide);
    }

    public function registerDeactivator($networkWide)
    {
        Hooks::doAction($this->_deactivateHook, $networkWide);
    }

    public static function registerUninstaller($networkWide)
    {
        Hooks::doAction(self::$_uninstallHook, $networkWide);
    }

    public static function migration()
    {
        $migrations = [
            'BSPluginOptions',
        ];

        return [
            'path' => Config::get('BASEDIR')
            . DIRECTORY_SEPARATOR
            . 'db'
            . DIRECTORY_SEPARATOR
            . 'Migrations'
            . DIRECTORY_SEPARATOR,
            'migrations' => $migrations,
        ];
    }

    public static function drop()
    {
        $migrations = [
            'BSPluginOptions',
        ];

        return [
            'path' => Config::get('BASEDIR')
            . DIRECTORY_SEPARATOR
            . 'db'
            . DIRECTORY_SEPARATOR
            . 'Migrations'
            . DIRECTORY_SEPARATOR,
            'migrations' => $migrations,
        ];
    }
}
