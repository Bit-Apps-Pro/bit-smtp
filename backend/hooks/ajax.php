<?php

use BitApps\BMI\Core\Http\Router\Route;
use BitApps\BMI\HTTP\Controllers\BlogController;
use BitApps\BMI\HTTP\Controllers\IntagrationManageController;
use BitApps\BMI\HTTP\Controllers\IntegrationCategoryController;
use BitApps\BMI\HTTP\Controllers\SMTPController;

if (!\defined('ABSPATH')) {
    exit;
}

Route::noAuth()->group(function () {
    Route::post('save_mail_config',[SMTPController::class,'saveMailConfig']);
    Route::get('get_mail_config',[SMTPController::class,'index']);
    // Route::get('integration-categories',[IntagrationManageController::class,'getIntegrationCategories']);
    // Route::post('integration/{integration}/update',[IntagrationManageController::class,'update']);
    // Route::post('integration/{ids}/destroy',[IntagrationManageController::class,'destroy']);

    // Route::post('category',[IntegrationCategoryController::class,'store']);
    // Route::get('category',[IntegrationCategoryController::class,'index']);
    // Route::post('category/{category}/update',[IntegrationCategoryController::class,'update']);
    // Route::post('category/{ids}/destroy',[IntegrationCategoryController::class,'destroy']);
    // Route::post('save-global-content', [BlogController::class, 'saveGlobalContent']);
    // Route::get('get-global-content',[BlogController::class,'getGlobalContent']);
    // Route::post('generate-new-platform-post',[BlogController::class , 'generateNewPlatformPost']);
    // Route::get('generate-all-platform-post',[BlogController::class,'generateAllPlatformPost']);
    // Route::post('reset-post',[BlogController::class,'resetPost']);

    // Route::get('post-categories',[BlogController::class,'getCategories']);
})->middleware('nonce:admin');
