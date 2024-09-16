<?php

use BitApps\SMTP\Deps\BitApps\WPKit\Http\Router\Route;
use BitApps\SMTP\HTTP\Controllers\SMTPAnalyticsController;
use BitApps\SMTP\HTTP\Controllers\SMTPController;

if (!\defined('ABSPATH')) {
    exit;
}

Route::noAuth()->group(function () {
    Route::post('save_mail_config', [SMTPController::class, 'saveMailConfig']);
    Route::get('get_mail_config', [SMTPController::class, 'index']);
    Route::post('send_test_mail', [SMTPController::class, 'sendTestEmail']);
    Route::post('telemetry_permission_handle', [SMTPAnalyticsController::class, 'telemetryPermissionHandle']);
    Route::get('telemetry_popup_disable_check', [SMTPAnalyticsController::class, 'telemetryPopupDisableCheck']);
})->middleware('nonce:admin');
