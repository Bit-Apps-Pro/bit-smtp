<?php

use BitApps\SMTP\Config;
use BitApps\SMTP\Deps\BitApps\WPDatabase\Blueprint;
use BitApps\SMTP\Deps\BitApps\WPDatabase\Connection;
use BitApps\SMTP\Deps\BitApps\WPDatabase\Schema;
use BitApps\SMTP\Deps\BitApps\WPKit\Migration\Migration;

if (! \defined('ABSPATH')) {
    exit;
}

final class BitSmtpLogsTableMigration extends Migration
{
    public function up()
    {
        Schema::withPrefix(Connection::wpPrefix() . Config::VAR_PREFIX)->create(
            'logs',
            function (Blueprint $table) {
                $table->id();
                $table->integer('status');
                $table->string('message');
                $table->longtext('details');
                $table->integer('retry_count')->default(0);
            }
        );
    }

    public function down()
    {
        Schema::drop('logs');
    }
}
