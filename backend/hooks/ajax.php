<?php

use BitApps\SMTP\Deps\BitApps\WPKit\Http\Router\Route;
use BitApps\SMTP\HTTP\Controllers\SMTPController;
use BitApps\SMTP\HTTP\Controllers\TelemetryPopupController;

if (!\defined('ABSPATH')) {
    exit;
}

Route::noAuth()->group(function () {
    Route::post('save_mail_config', [SMTPController::class, 'saveMailConfig']);
    Route::get('get_mail_config', [SMTPController::class, 'index']);
    Route::post('send_test_mail', [SMTPController::class, 'sendTestEmail']);
    Route::post('telemetry_permission_handle', [TelemetryPopupController::class, 'handleTelemetryPermission']);
    Route::get('telemetry_popup_disable_check', [TelemetryPopupController::class, 'isPopupDisabled']);
    Route::get('new_product_nav_btn_visible_check', [SMTPController::class, 'newProductNavBtnVisibleCheck']);
    Route::post('hide_new_product_nav_btn', [SMTPController::class, 'newProductNavBtnHide']);
})->middleware('nonce:admin');
