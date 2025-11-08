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
                $table->tinyint('status');
                $table->longtext('subject');
                $table->varchar('to_addr', 320);
                $table->longtext('details')->nullable();
                $table->text('debug_info')->nullable();
                $table->tinyint('retry_count')->defaultValue(0);

                $table->timestamps();
            }
        );
    }

    public function down()
    {
        Schema::drop('logs');
    }
}
