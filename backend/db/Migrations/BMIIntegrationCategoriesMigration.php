<?php

use BitApps\BMI\Core\Database\Blueprint;
use BitApps\BMI\Core\Database\Migration;
use BitApps\BMI\Core\Database\Schema;

if (!\defined('ABSPATH')) {
    exit;
}

final class BMIIntegrationCategoriesMigration extends Migration
{
    public function up()
    {
        Schema::create('integration_categorys', function (Blueprint $table) {
            $table->id();
            $table->string('category_name');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('integration_categorys');
    }
}