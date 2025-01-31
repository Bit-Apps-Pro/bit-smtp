<?php

// phpcs:disable Squiz.NamingConventions.ValidVariableName

namespace BitApps\SMTP;

use BitApps\SMTP\Views\Layout;

if (!\defined('ABSPATH')) {
    exit;
}

/**
 * Provides App configurations.
 */
class Config
{
    public const SLUG = 'bit-smtp';

    public const TITLE = 'Bit SMTP';

    public const VAR_PREFIX = 'bit_smtp_';

    public const VERSION = '1.1.9';

    public const DB_VERSION = '1.0';

    public const REQUIRED_PHP_VERSION = '7.4';

    public const REQUIRED_WP_VERSION = '5.0';

    public const API_VERSION = '1.0';

    public const APP_BASE = '../../bit_smtp.php';

    public const DEV_URL = 'http://localhost:3000/wp-content/plugins/bit-smtp/frontend/src';

    /**
     * Provides configuration for plugin.
     *
     * @param string $type    Type of conf
     * @param string $default Default value
     *
     * @return null|array|string
     */
    public static function get($type, $default = null)
    {
        switch ($type) {
            case 'MAIN_FILE':
                return realpath(__DIR__ . DIRECTORY_SEPARATOR . self::APP_BASE);

            case 'BASENAME':
                return plugin_basename(trim(self::get('MAIN_FILE')));

            case 'BASEDIR':
                return plugin_dir_path(self::get('MAIN_FILE')) . 'backend';

            case 'SITE_URL':
                $parsedUrl = parse_url(get_admin_url());
                $siteUrl   = $parsedUrl['scheme'] . '://' . $parsedUrl['host'];
                $siteUrl .= empty($parsedUrl['port']) ? null : ':' . $parsedUrl['port'];

                return $siteUrl;

            case 'ADMIN_URL':
                return str_replace(self::get('SITE_URL'), '', get_admin_url());

            case 'API_URL':
                global $wp_rewrite;

                return [
                    'base'      => get_rest_url() . self::SLUG . '/v1',
                    'separator' => $wp_rewrite->permalink_structure ? '?' : '&',
                ];

            case 'ROOT_URI':
                return set_url_scheme(plugins_url('', self::get('MAIN_FILE')), parse_url(home_url())['scheme']);

            case 'ASSET_URI':
                return self::get('ROOT_URI') . '/assets';

            case 'ASSET_JS_URI':
                return self::get('ASSET_URI') . '/js';

            case 'ASSET_CSS_URI':
                return self::get('ASSET_URI') . '/css';

            case 'PLUGIN_PAGE_LINKS':
                return self::pluginPageLinks();

            case 'SIDE_BAR_MENU':
                return self::sideBarMenu();

            case 'WP_DB_PREFIX':
                global $wpdb;

                return $wpdb->prefix;

            default:
                return $default;
        }
    }

    /**
     * Prefixed variable name with prefix.
     *
     * @param string $option Variable name
     *
     * @return array
     */
    public static function withPrefix($option)
    {
        return self::VAR_PREFIX . $option;
    }

    /**
     * Retrieves options from option table.
     *
     * @param string $option  Option name
     * @param bool   $default default value
     * @param bool   $wp      Whether option is default wp option
     *
     * @return mixed
     */
    public static function getOption($option, $default = false, $wp = false)
    {
        if ($wp) {
            return get_option($option, $default);
        }

        return get_option(self::withPrefix($option), $default);
    }

    /**
     * Saves option to option table.
     *
     * @param string $option   Option name
     * @param bool   $autoload Whether option will autoload
     * @param mixed  $value
     *
     * @return bool
     */
    public static function addOption($option, $value, $autoload = false)
    {
        return add_option(self::withPrefix($option), $value, '', $autoload ? 'yes' : 'no');
    }

    /**
     * Save or update option to option table.
     *
     * @param string $option   Option name
     * @param mixed  $value    Option value
     * @param bool   $autoload Whether option will autoload
     *
     * @return bool
     */
    public static function updateOption($option, $value, $autoload = null)
    {
        return update_option(self::withPrefix($option), $value, !\is_null($autoload) ? 'yes' : null);
    }

    public static function isDev()
    {
        return \defined('BITAPPS_DEV') && BITAPPS_DEV;
    }

    /**
     * Provides links for plugin pages. Those links will bi displayed in
     * all plugin pages under the plugin name.
     *
     * @return array
     */
    private static function pluginPageLinks()
    {
        return [
            'Home' => [
                'title' => __('Home', 'bit-smtp'),
                'url'   => self::get('ADMIN_URL') . 'admin.php?page=' . self::SLUG,
            ]
        ];
    }

    /**
     * Provides menus for wordpress admin sidebar.
     * should return an array of menus with the following structure:
     * [
     *   'type' => menu | submenu,
     *  'name' => 'Name of menu will shown in sidebar',
     *  'capability' => 'capability required to access menu',
     *  'slug' => 'slug of menu after ?page=',.
     *
     *  'title' => 'page title will be shown in browser title if type is menu',
     *  'callback' => 'function to call when menu is clicked',
     *  'icon' =>   'icon to display in menu if menu type is menu',
     *  'position' => 'position of menu in sidebar if menu type is menu',
     *
     * 'parent' => 'parent slug if submenu'
     * ]
     *
     * @return array
     */
    private static function sideBarMenu()
    {
        $adminViews = new Layout();

        return [
            'Home'      => [
                'type'       => 'menu',
                'title'      => __('Bit SMTP', 'bit-smtp'),
                'name'       => __('Bit SMTP', 'bit-smtp'),
                'capability' => 'manage_options',
                'slug'       => self::SLUG,
                'callback'   => [$adminViews, 'body'],
                'icon'       => 'data:image/svg+xml;base64,' . base64_encode('<svg xmlns="http://www.w3.org/2000/svg" fill="#9ea3a8" width="64" height="64" viewBox="0 0 43 34"><path d="M.007 3.585v16.836q0 3.586 3.751 3.585L20 24v-5h10v-4.986l.991-1L34 13V3.585Q34 0 30.249 0H3.758Q.007 0 .007 3.585zm3.517 2.572a1.49 1.49 0 01-.508-.935 1.581 1.581 0 01.274-1.208 1.449 1.449 0 011.094-.663 1.756 1.756 0 011.25.312l11.409 7.716 11.331-7.716a1.96 1.96 0 011.289-.312 1.546 1.546 0 011.094.663 1.4 1.4 0 01.273 1.208 1.67 1.67 0 01-.547.935l-13.44 11.068z"/><path d="M22 28h10l-.009 4.624a1.126 1.126 0 001.922.8l8.25-8.236a1.126 1.126 0 000-1.594l-8.25-8.241a1.126 1.126 0 00-1.922.8v4.866L22 21v7z"/></svg>'),
                'position'   => '20',
            ]
        ];
    }
}
