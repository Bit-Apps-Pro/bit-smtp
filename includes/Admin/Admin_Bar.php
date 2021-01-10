<?php

namespace BitPress\BIT_SMTP\Admin;

/**
 * The admin menu and page handler class
 */
class Admin_Bar
{

    public function register()
    {
        add_action('init', array($this, 'register_post_type'));
        add_action('admin_menu', array($this, 'register_admin_menu'));
        /*  */
    }
    /**
     * Register the admin menu
     *
     * @return void
     */
    public function register_admin_menu()
    {
        global $submenu;
        $capability = apply_filters('bit_smtp_access_capability', 'manage_options');

        $hook = add_menu_page(__('Bit SMTP', 'Bit SMTP'), 'BIT SMTP', $capability, 'bit_smtp', array($this, 'table_home_page'), 'data:image/svg+xml;base64,' . base64_encode('<svg xmlns="http://www.w3.org/2000/svg" fill="#9ea3a8" width="64" height="64" viewBox="0 0 43 34"><path d="M.007 3.585v16.836q0 3.586 3.751 3.585L20 24v-5h10v-4.986l.991-1L34 13V3.585Q34 0 30.249 0H3.758Q.007 0 .007 3.585zm3.517 2.572a1.49 1.49 0 01-.508-.935 1.581 1.581 0 01.274-1.208 1.449 1.449 0 011.094-.663 1.756 1.756 0 011.25.312l11.409 7.716 11.331-7.716a1.96 1.96 0 011.289-.312 1.546 1.546 0 011.094.663 1.4 1.4 0 01.273 1.208 1.67 1.67 0 01-.547.935l-13.44 11.068z"/><path d="M22 28h10l-.009 4.624a1.126 1.126 0 001.922.8l8.25-8.236a1.126 1.126 0 000-1.594l-8.25-8.241a1.126 1.126 0 00-1.922.8v4.866L22 21v7z"/></svg>'), 56);
        if (current_user_can($capability)) {

            $submenu['bit_smtp'][] = array(__('General', 'bit_smtp'), $capability, 'admin.php?page=bit_smtp');
            $submenu['bit_smtp'][] = array(__('About Us', 'bit_smtp'), $capability, 'admin.php?page=bit_smtp#/about-us');
        }
        // if(is_plugin_active('bit-form/bitforms.php')){
        //     echo 'Active';

        // }else{
        //     echo 'Deactive';

        // }
        add_action('load-' . $hook, array($this, 'load_assets'));
    }

    /**
     * Load the asset libraries
     *
     * @return void
     */
    public function load_assets()
    {
        /*  require_once dirname( __FILE__ ) . '/class-form-builder-assets.php';
        new bit_wp_smtp_Form_Builder_Assets(); */
    }

    /**
     * The contact form page handler
     *
     * @return void
     */
    public function table_home_page()
    {
        require_once bit_wp_smtp_PLUGIN_DIR_PATH . '/views/view-root.php';

        /* echo plugin_basename( bit_wp_smtp_PLUGIN_MAIN_FILE );
      $query = new WP_Query();
      $forms = $query->get_posts();
      var_dump($forms); */
        $parsed_url = parse_url(get_admin_url());
        //   echo get_admin_url();
        $base_apth_admin =  str_replace($parsed_url['scheme'] . "://" . $parsed_url['host'], null, get_admin_url());
        wp_enqueue_script('bit_wp_smtp-admin-script', bit_wp_smtp_ASSET_URI . '/js/index.js');
        $bit_wp_smtp = apply_filters('bit_wp_smtp_localized_script', array(
            'nonce'           => wp_create_nonce('bit_wp_smtp'),
            'confirm'         => __('Are you sure?', 'bit_wp_smtp'),
            'isPro'           => false,
            'routeComponents' => array('default' => null),
            'mixins'          => array('default' => null),
            'assetsURL'       => bit_wp_smtp_ASSET_URI . '/js/',
            'baseURL'         => $base_apth_admin . 'admin.php?page=bit_wp_smtp#/',
            'ajaxURL'         => admin_url('admin-ajax.php')
        ));
        // $checkoutFields = (new WC_Checkout)->get_checkout_fields();
        // $checkoutFields = WC()->checkout()->get_checkout_fields();
        // $bit_wp_smtp['checkoutFields'] = (new WC_Checkout)->get_checkout_fields();
        wp_localize_script('bit_wp_smtp-admin-script', 'bit_wp_smtp', $bit_wp_smtp);
    }


    /**
     * Admin footer text.
     *
     * Fired by `admin_footer_text` filter.
     *
     * @since 1.3.5
     *
     * @param string $footer_text The content that will be printed.
     *
     * @return string The content that will be printed.
     **/
    public function admin_footer_text($footer_text)
    {
        $current_screen = get_current_screen();
        $is_bit_wp_smtps_screen = ($current_screen && false !== strpos($current_screen->id, 'bit_wp_smtp'));

        if ($is_bit_wp_smtps_screen) {
            $footer_text = sprintf(
                __('If you like %1$s please leave us a %2$s rating. A huge thank you from %3$s in advance!', 'bit_wp_smtp'),
                '<strong>' . __('bit_wp_smtp', 'bit_wp_smtp') . '</strong>',
                '<a href="https://wordpress.org/support/plugin/bit_wp_smtp/reviews/" target="_blank">&#9733;&#9733;&#9733;&#9733;&#9733;</a>',
                '<strong>BitPress</strong>'
            );
        }

        return $footer_text;
    }
}
