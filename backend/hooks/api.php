<?php

if (!\defined('ABSPATH')) {
    exit;
}

use BitApps\SMTP\Deps\BitApps\WPKit\Http\Router\Route;
use BitApps\SMTP\HTTP\Controllers\LogController;
use BitApps\SMTP\HTTP\Controllers\SMTPController;
use BitApps\SMTP\HTTP\Controllers\TelemetryPopupController;

Route::group(function () {
    Route::post('mail/config/save', [SMTPController::class, 'saveMailConfig']);
    Route::get('mail/config/get', [SMTPController::class, 'index']);
    Route::post('mail/send-test', [SMTPController::class, 'sendTestEmail']);
    Route::post('mail/resend', [SMTPController::class, 'resend']);

    Route::post('telemetry/handle-permission', [TelemetryPopupController::class, 'handleTelemetryPermission']);
    Route::get('telemetry/popup-status', [TelemetryPopupController::class, 'isPopupDisabled']);

    Route::post('logs/all', [LogController::class, 'all']);
    Route::post('logs/details/{id}', [LogController::class, 'details']);
    Route::post('logs/delete', [LogController::class, 'delete']);
    Route::get('logs/is_enabled', [LogController::class, 'isEnabled']);
    Route::post('logs/toggle', [LogController::class, 'toggle']);

    Route::post('logs/update_retention', [LogController::class, 'updateRetention']);
})->middleware('nonce:admin');
