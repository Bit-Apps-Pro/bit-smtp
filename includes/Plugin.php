<?php

namespace BitPress\BIT_SMTP;

use BitPress\BIT_SMTP\Admin\Admin_Bar;
use BitPress\BIT_SMTP\Admin\Admin_Ajax;

/**
 * Main class for the plugin.
 *
 * @since 1.0.0-alpha
 */
final class Plugin
{

	/**
	 * Main instance of the plugin.
	 *
	 * @since 1.0.0-alpha
	 * @var Plugin|null
	 */
	private static $instance = null;

	/**
	 * Holds various class instances
	 *
	 * @var array
	 */
	private $container = array();

	/**
	 * Registers the plugin with WordPress.
	 *
	 * @since 1.0.0-alpha
	 */
	public function register()
	{
		//(new Activation())->activate();

		$display_bit_form_meta = function () {
			printf('<meta name="generator" content="Forms by BitCode %s" />', esc_attr(BIT_SMTP_VERSION));
		};
		add_action('wp_head', $display_bit_form_meta);
		add_action('login_head', $display_bit_form_meta);
		add_action('plugins_loaded', array($this, 'init_plugin'));
		// Initiate the plugin on 'init' 
		$this->init_plugin();
	}

	/*****************************frm***************************************************************** */
	/**
	 * Do plugin upgrades
	 *
	 * @since 1.1.2
	 *
	 * @return void
	 */
	function plugin_upgrades()
	{

		if (!current_user_can('manage_options')) {
			return;
		}
	}

	/**
	 * Initialize the hooks
	 *
	 * @return void
	 */

	public function init_hooks()
	{

		// Localize our plugin
		add_action('init', array($this, 'localization_setup'));

		// initialize the classes
		add_action('init', array($this, 'init_classes'));
		add_action('init', array($this, 'wpdb_table_shortcuts'), 0);
		add_action('phpmailer_init', [$this, 'mailConfig'], 1000);

		add_filter('plugin_action_links_' . plugin_basename(BIT_SMTP_PLUGIN_MAIN_FILE), array($this, 'plugin_action_links'));
	}

	function mailConfig($phpmailer)
	{
		//$integrationHandler = new IntegrationHandler(0);
		$mailConfig = get_option('bit_smtp_options');
		if (is_array($mailConfig)) {
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
				$phpmailer->SMTP_DEBUG =  1;
				$phpmailer->From       = $mailConfig['form_email_address'];
				$phpmailer->FromName   = $mailConfig['form_name'];
			}
		}
	}
	/**
	 * Set WPDB table shortcut names
	 *
	 * @return void
	 */
	public function wpdb_table_shortcuts()
	{
		global $wpdb;

		$wpdb->bit_wc_smtp_schema   = $wpdb->prefix . 'bit_wc_smtp_schema';
		$wpdb->bit_wc_smtp_schema_meta = $wpdb->prefix . 'bit_wc_smtp_schema_meta';
	}

	/**
	 * Initialize plugin for localization
	 *
	 * @uses load_plugin_textdomain()
	 */
	public function localization_setup()
	{
		load_plugin_textdomain('bit_smtp', false, BIT_SMTP_PLUGIN_DIR_PATH . '/lang/');
	}

	/**
	 * Instantiate the required classes
	 *
	 * @return void
	 */
	public function init_classes()
	{
		if ($this->is_request('admin')) {
			$this->container['admin']        = (new Admin_Bar())->register();
			$this->container['admin_ajax']   = (new Admin_Ajax())->register();
		}
	}



	/**
	 * Plugin action links
	 *
	 * @param  array $links
	 *
	 * @return array
	 */
	function plugin_action_links($links)
	{
		$links[] = '<a href="https://www.bitpress.pro" target="_blank">' . __('Bitpress', 'bit_smtp') . '</a>';

		return $links;
	}


	/**
	 * What type of request is this?
	 *
	 * @since 1.0.0-alpha
	 *
	 * @param  string $type admin, ajax, cron, api or frontend.
	 *
	 * @return bool
	 */
	private function is_request($type)
	{

		switch ($type) {
			case 'admin':
				return is_admin();

			case 'ajax':
				return defined('DOING_AJAX');

			case 'cron':
				return defined('DOING_CRON');

			case 'api':
				return defined('REST_REQUEST');

			case 'frontend':
				return (!is_admin() || defined('DOING_AJAX')) && !defined('DOING_CRON');
		}
	}

	public function init_plugin()
	{
		$this->init_hooks();

		do_action('bit_wc_smtp_loaded');
	}
	/********************************************************************************************** */

	/**
	 * Retrieves the main instance of the plugin.
	 *
	 * @since 1.0.0-alpha
	 *
	 * @return bit_wp_smtp Plugin main instance.
	 */
	public static function instance()
	{
		return static::$instance;
	}

	/**
	 * Loads the plugin main instance and initializes it.
	 *
	 * @since 1.0.0-alpha
	 *
	 * @param string $main_file Absolute path to the plugin main file.
	 * @return bool True if the plugin main instance could be loaded, false otherwise.
	 */
	public static function load($main_file)
	{
		if (null !== static::$instance) {
			return false;
		}

		static::$instance = new static($main_file);
		static::$instance->register();

		return true;
	}
}
