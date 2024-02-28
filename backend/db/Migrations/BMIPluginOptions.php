<?php

use BitApps\SMTP\Config;
use BitApps\WPKit\Database\Connection as DB;
use BitApps\WPKit\Database\Migration;

if (!\defined('ABSPATH')) {
    exit;
}

final class BMIPluginOptions extends Migration
{
    public function up()
    {
        Config::updateOption('db_version', Config::DB_VERSION, true);
        Config::updateOption('installed', time(), true);
        Config::updateOption('version', Config::VERSION, true);
        Config::updateOption('global_post_content', '', true);
        Config::updateOption('post_generate_status', false, true);
    }

    public function down()
    {
        $pluginOptions = [
            Config::withPrefix('db_version'),
            Config::withPrefix('installed'),
            Config::withPrefix('version'),
            Config::updateOption('global_post_content', '', true),
            Config::updateOption('post_generate_status', false, true),
        ];

        DB::query(
            DB::prepare(
                'DELETE FROM `' . DB::wpPrefix() . 'options` WHERE option_name in ('
                    . implode(
                        ',',
                        array_map(
                            function () {
                                return '%s';
                            },
                            $pluginOptions
                        )
                    ) . ')',
                $pluginOptions
            )
        );
    }
}
