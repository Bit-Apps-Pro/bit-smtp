<?php

use BitApps\WPKit\Http\Router\Route;
use BitApps\SMTP\HTTP\Controllers\SMTPController;

if (!\defined('ABSPATH')) {
    exit;
}

Route::noAuth()->group(function () {
    Route::post('save_mail_config', [SMTPController::class,'saveMailConfig']);
    Route::get('get_mail_config', [SMTPController::class,'index']);
})->middleware('nonce:admin');
