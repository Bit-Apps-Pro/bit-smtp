<?php

if (! \defined('ABSPATH')) {
    exit;
}

// Autoload vendor files.
require_once __DIR__ . '/../vendor/autoload.php';

// Initialize the plugin.
BitApps\SMTP\Plugin::load();
