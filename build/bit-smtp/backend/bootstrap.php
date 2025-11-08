<?php

if (! \defined('ABSPATH')) {
    exit;
}

if (is_readable(__DIR__ . '/../vendor/autoload.php')) {
    require_once __DIR__ . '/../vendor/autoload.php';
    BitApps\SMTP\Plugin::load();
} else {
    add_action('admin_notices', function () {
        printf(
            '<div class="notice notice-error"><p>%s</p></div>',
            esc_html__('The SMTP plugin is not installed properly. Please run "composer install" in the plugin directory.', 'bit-smtp')
        );
    });
}
