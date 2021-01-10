<?php

use BitPress\BIT_SMTP\Plugin;

/**
 * Plugin Name: BIT SMTP
 * Plugin URI:  bitpress.pro/bit_wp_smtp
 * Description: BIT SMTP Send email via SMTP plugin by Bitpress
 * Version:     1.0.2
 * Author:      BitPress
 * Author URI:  bitpress.pro
 * Text Domain: bit_wp_smtp
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
define('bit_wp_smtp_VERSION', '1.0.1');
define('bit_wp_smtp_PLUGIN_MAIN_FILE', __FILE__);
define('bit_wp_smtp_PLUGIN_BASENAME', plugin_basename(bit_wp_smtp_PLUGIN_MAIN_FILE));
define('bit_wp_smtp_PLUGIN_DIR_PATH', plugin_dir_path(bit_wp_smtp_PLUGIN_MAIN_FILE));
define('bit_wp_smtp_ROOT_URI', plugins_url('', bit_wp_smtp_PLUGIN_MAIN_FILE));
define('bit_wp_smtp_ASSET_URI', bit_wp_smtp_ROOT_URI . '/assets');

/**
 * Handles plugin activation.
 *
 * Throws an error if the plugin is activated on an older version than PHP 5.4.
 *
 * @access private
 *
 * @param bool $network_wide Whether to activate network-wide.
 */
function bit_wp_smtp_activate_plugin($network_wide)
{

	if (version_compare(PHP_VERSION, '5.4.0', '<')) {
		wp_die(
			esc_html__('bit_wp_smtp requires PHP version 5.4.', 'bit_wp_smtp'),
			esc_html__('Error Activating', 'bit_wp_smtp')
		);
	}
	$bit_smtp_version = get_option('bit_smtp_version');
	$installedDB = get_option('bit_smtp_installed');
	$mailConfig = get_option('bit_smtp_options');
	$data = "{}";
	if (!$installedDB) {
		update_option('bit_smtp_installed', time());
	}
	if (!$mailConfig) {
		update_option('bit_smtp_options', $data);
	}
	if (!$bit_smtp_version) {
		update_option('bit_smtp_version', bit_wp_smtp_VERSION);
	}
}

register_activation_hook(__FILE__, 'bit_wp_smtp_activate_plugin');

function bit_wp_smtp_uninstall_plugin()
{
	if (version_compare(PHP_VERSION, '5.6.0', '<')) {
		wp_die(
			esc_html__('bit_wp_smtp requires PHP version 5.4.', 'bit_wp_smtp'),
			esc_html__('Error Activating', 'bit_wp_smtp')
		);
	}

	global $wpdb;
	$columns = ["bit_smtp_installed", "bit_smtp_options","bit_smtp_version"];
	foreach ($columns as $column) {
		$wpdb->query("DELETE FROM `{$wpdb->prefix}options` WHERE option_name=$column");
	}
}
register_uninstall_hook(__FILE__, 'bit_wp_smtp_uninstall_plugin');

/**
 * Handles plugin deactivation.
 *
 * @access private
 *
 * @param bool $network_wide Whether to deactivate network-wide.
 */
function bit_wp_smtp_deactivate_plugin($network_wide)
{
	if (version_compare(PHP_VERSION, '5.4.0', '<')) {
		return;
	}

	if ($network_wide) {
		return;
	}

	do_action('bit_wp_smtp_deactivation', $network_wide);
}

register_deactivation_hook(__FILE__, 'bit_wp_smtp_deactivate_plugin');

/**
 * Handles plugin uninstall.
 *
 * @access private
 */

if (version_compare(PHP_VERSION, '5.4.0', '>=')) {
	// Autoload vendor files.
	require_once bit_wp_smtp_PLUGIN_DIR_PATH . 'vendor/autoload.php';

	// Initialize the plugin.
	Plugin::load(bit_wp_smtp_PLUGIN_MAIN_FILE);
}
