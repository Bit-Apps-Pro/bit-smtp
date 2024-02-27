<?php

use BitApps\BMI\Core\Database\Blueprint;
use BitApps\BMI\Core\Database\Migration;
use BitApps\BMI\Core\Database\Schema;

if (!\defined('ABSPATH')) {
    exit;
}

final class BMIPlatformsMigration extends Migration
{
    public function up()
    {
        Schema::create('platforms', function (Blueprint $table) {
            $table->id();
            $table->string('platform_type');
            $table->string('app_name');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('platforms');
    }
}
