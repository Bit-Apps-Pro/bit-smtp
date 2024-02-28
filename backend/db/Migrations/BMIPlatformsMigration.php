<?php

use BitApps\WPKit\Database\Blueprint;
use BitApps\WPKit\Database\Migration;
use BitApps\WPKit\Database\Schema;

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
