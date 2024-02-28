<?php

use BitApps\WPKit\Database\Blueprint;
use BitApps\WPKit\Database\Migration;
use BitApps\WPKit\Database\Schema;

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