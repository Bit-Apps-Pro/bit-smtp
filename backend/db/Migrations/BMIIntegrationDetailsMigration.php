<?php

use BitApps\BMI\Core\Database\Blueprint;
use BitApps\BMI\Core\Database\Migration;
use BitApps\BMI\Core\Database\Schema;

if (!\defined('ABSPATH')) {
    exit;
}

final class BMIIntegrationDetailsMigration extends Migration
{
    public function up()
    {
        Schema::create('integration_details', function (Blueprint $table) {
            $table->id();
            $table->string('product_name');
            $table->string('integration_name');
            $table->string('integration_category');
            // $table->string('integration_desc')->nullable();
            $table->string('integration_type');
            $table->string('doc_link');
            $table->boolean('is_free')->defaultValue(0);
            $table->string('integration_logo');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('integration_details');
    }
}
