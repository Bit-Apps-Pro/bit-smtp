<?php

use BitApps\SMTP\Config;
use BitApps\SMTP\Deps\BitApps\WPDatabase\Connection as DB;
use BitApps\SMTP\Deps\BitApps\WPKit\Migration\Migration;

if (!\defined('ABSPATH')) {
    exit;
}

final class BitSmtpPluginOptions extends Migration
{
    public function up()
    {
        Config::updateOption('db_version', Config::DB_VERSION, true);
        Config::updateOption('installed', time(), true);
        Config::updateOption('version', Config::VERSION, true);
    }

    public function down()
    {
        $pluginOptions = [
            Config::withPrefix('db_version'),
            Config::withPrefix('installed'),
            Config::withPrefix('version'),
            Config::withPrefix('settings'),
            Config::withPrefix('old_version'),
            Config::withPrefix('log_retention'),
            Config::withPrefix('log_deleted_at'),
            Config::withPrefix('tracking_skipped'),
            Config::withPrefix('test_mail_form_submitted'),
        ];

        DB::query(
            DB::prepare(
                'DELETE FROM `%1s` WHERE option_name in ('
                    . implode(
                        ',',
                        array_map(
                            function () {
                                return '%s';
                            },
                            $pluginOptions
                        )
                    ) . ')',
                [DB::wpPrefix() . 'options', ...$pluginOptions]
            )
        );
    }
}
