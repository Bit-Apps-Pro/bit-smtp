<?php

use BitPress\BIT_SMTP\Plugin;

/**
 * Plugin Name: BIT SMTP
 * Plugin URI:  bitpress.pro/bit_smtp
 * Description: Send email via SMTP using BIT SMTP plugin by Bitpress
 * Version:     1.0.0
 * Author:      BitPress
 * Author URI:  bitpress.pro
 * Text Domain: bit_smtp
 * Domain Path: /languages
 * License: GPLv2 or later
 */

/***
 *
 *If try to direct access  plugin folder it will Exit
 * 
 **/
if (!defined('ABSPATH')) {
	exit;
}


// Define most essential constants.
define('BIT_SMTP_VERSION', '1.0.0');
define('BIT_SMTP_PLUGIN_MAIN_FILE', __FILE__);
define('BIT_SMTP_PLUGIN_BASENAME', plugin_basename(BIT_SMTP_PLUGIN_MAIN_FILE));
define('BIT_SMTP_PLUGIN_DIR_PATH', plugin_dir_path(BIT_SMTP_PLUGIN_MAIN_FILE));
define('BIT_SMTP_ROOT_URI', plugins_url('', BIT_SMTP_PLUGIN_MAIN_FILE));
define('BIT_SMTP_ASSET_URI', BIT_SMTP_ROOT_URI . '/assets');

/**
 * Handles plugin activation.
 *
 * Throws an error if the plugin is activated on an older version than PHP 5.4.
 *
 * @access private
 *
 * @param bool $network_wide Whether to activate network-wide.
 */
function bit_smtp_activate_plugin($network_wide)
{

	if (version_compare(PHP_VERSION, '5.4.0', '<')) {
		wp_die(
			esc_html__('bit_smtp requires PHP version 5.4.', 'bit_smtp'),
			esc_html__('Error Activating', 'bit_smtp')
		);
	}
	$bit_smtp_version = get_site_option('bit_smtp_version');
	$installedDB = get_site_option('bit_smtp_installed');
	$mailConfig = get_site_option('bit_smtp_options');
	$data = "{}";
	if (!$installedDB) {
		update_option('bit_smtp_installed', time());
	}
	if (!$mailConfig) {
		update_option('bit_smtp_options', $data);
	}
	if (!$bit_smtp_version) {
		update_option('bit_smtp_version', BIT_SMTP_VERSION);
	}
}

register_activation_hook(__FILE__, 'bit_smtp_activate_plugin');

function bit_smtp_uninstall_plugin()
{
	if (version_compare(PHP_VERSION, '5.6.0', '<')) {
		wp_die(
			esc_html__('bit_smtp requires PHP version 5.4.', 'bit_smtp'),
			esc_html__('Error Activating', 'bit_smtp')
		);
	}

	global $wpdb;
	$columns = ["bit_smtp_installed", "bit_smtp_options","bit_smtp_version"];
	foreach ($columns as $column) {
		$wpdb->query("DELETE FROM `{$wpdb->prefix}options` WHERE option_name=$column");
	}
}
register_uninstall_hook(__FILE__, 'bit_smtp_uninstall_plugin');

/**
 * Handles plugin deactivation.
 *
 * @access private
 *
 * @param bool $network_wide Whether to deactivate network-wide.
 */
function bit_smtp_deactivate_plugin($network_wide)
{
	if (version_compare(PHP_VERSION, '5.4.0', '<')) {
		return;
	}

	if ($network_wide) {
		return;
	}

	do_action('bit_smtp_deactivation', $network_wide);
}

register_deactivation_hook(__FILE__, 'bit_smtp_deactivate_plugin');


if (version_compare(PHP_VERSION, '5.4.0', '>=')) {
	// Autoload vendor files.
	require_once BIT_SMTP_PLUGIN_DIR_PATH . 'vendor/autoload.php';

	// Initialize the plugin.
	Plugin::load(BIT_SMTP_PLUGIN_MAIN_FILE);
}
