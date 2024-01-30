<?php

namespace BitApps\SMTP\Admin;

/**
 * The admin menu and page handler class
 */
class Admin_Bar
{
    public function register()
    {
        add_action('admin_menu', [$this, 'registerMenu']);
        add_action('admin_footer_text', [$this, 'footerText']);
    }
    /**
     * Register the admin menu
     *
     * @return void
     */
    public function registerMenu()
    {
        global $submenu;
        $capability = apply_filters('bit_smtp_access_capability', 'manage_options');

        add_menu_page(__('Bit SMTP', 'Bit SMTP'), 'BIT SMTP', $capability, 'bit-smtp', array($this, 'dashboard'), 'data:image/svg+xml;base64,' . base64_encode('<svg xmlns="http://www.w3.org/2000/svg" fill="#9ea3a8" width="64" height="64" viewBox="0 0 43 34"><path d="M.007 3.585v16.836q0 3.586 3.751 3.585L20 24v-5h10v-4.986l.991-1L34 13V3.585Q34 0 30.249 0H3.758Q.007 0 .007 3.585zm3.517 2.572a1.49 1.49 0 01-.508-.935 1.581 1.581 0 01.274-1.208 1.449 1.449 0 011.094-.663 1.756 1.756 0 011.25.312l11.409 7.716 11.331-7.716a1.96 1.96 0 011.289-.312 1.546 1.546 0 011.094.663 1.4 1.4 0 01.273 1.208 1.67 1.67 0 01-.547.935l-13.44 11.068z"/><path d="M22 28h10l-.009 4.624a1.126 1.126 0 001.922.8l8.25-8.236a1.126 1.126 0 000-1.594l-8.25-8.241a1.126 1.126 0 00-1.922.8v4.866L22 21v7z"/></svg>'), 56);
        if (current_user_can($capability)) {

            $submenu['bit-smtp'][] = array(__('General', 'bit-smtp'), $capability, 'admin.php?page=bit-smtp');
        }
    }

    /**
     * The contact form page handler
     *
     * @return void
     */
    public function dashboard()
    {
        echo '<div id="bit-smtp-root"></div>';

        $parsedUrl = parse_url(get_admin_url());
        $site_url = $parsedUrl['scheme'] . "://" . $parsedUrl['host'];
        $site_url .= empty($parsed_url['port']) ? null : ':' . $parsed_url['port'];
        $base_path_admin =  str_replace($site_url, '', get_admin_url());
        $prefix = 'bitsmtp';
        if (is_readable(BIT_SMTP_PLUGIN_DIR_PATH . DIRECTORY_SEPARATOR . 'port')) {
            $devPort = file_get_contents(BIT_SMTP_PLUGIN_DIR_PATH . DIRECTORY_SEPARATOR . 'port');
            $devUrl = 'http://localhost:' . $devPort;

            wp_enqueue_script(
                'vite-client-helper-' . $prefix . '-MODULE',
                $devUrl . '/config/devHotModule.js',
                [],
                null
            );

            wp_enqueue_script(
                'vite-client-' . $prefix . '-MODULE',
                $devUrl . '/@vite/client',
                [],
                null
            );
            wp_enqueue_script(
                'index-' . $prefix . '-MODULE',
                $devUrl . '/index.jsx',
                [],
                null
            );
        } else {
            wp_enqueue_script(
                'index-' . $prefix . '-MODULE',
                BIT_SMTP_ASSET_URI . "/index-" . BIT_SMTP_VERSION . ".js",
                [],
                null
            );
        }
        $frontendEnv = apply_filters(
            'bit_wc_smtp_localized_script',
            array(
                'nonce'           => wp_create_nonce('bit-smtp'),
                'confirm'         => __('Are you sure?', 'bit-smtp'),
                'routeComponents' => array('default' => null),
                'mixins'          => array('default' => null),
                'assetsURL'       => BIT_SMTP_ASSET_URI . '/js/',
                'baseURL'         => $base_path_admin . 'admin.php?page=bit-smtp#/',
                'ajaxURL'         => admin_url('admin-ajax.php')
            )
        );
        wp_localize_script('index-' . $prefix . '-MODULE', 'bitsmtp', $frontendEnv);
    }


    /**
     * Admin footer text.
     *
     * Fired by `admin_footer_text` filter.
     *
     * @since 1.0.0
     *
     * @param string $footerText The content that will be printed.
     *
     * @return string The content that will be printed.
     **/
    public function footerText($footerText)
    {
        $currentScreen = get_current_screen();
        $isPluginDash = ($currentScreen && false !== strpos($currentScreen->id, 'bit-smtp'));

        if ($isPluginDash) {
            $footerText .= sprintf(
                __(
                    'If you like %1$s please leave us a %2$s rating. A huge thank you from %3$s in advance!',
                    'bit-smtp'
                ),
                '<strong>' . __('Bit SMTP', 'bit-smtp') . '</strong>',
                '<a href="https://wordpress.org/support/plugin/bit-smtp/reviews/" target="_blank">
                &#9733;&#9733;&#9733;&#9733;&#9733;
                </a>',
                '<strong>BitApps</strong>'
            );
        }

        return $footerText;
    }
}
