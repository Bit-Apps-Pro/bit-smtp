<?php
/**
 * @license GPL-2.0-or-later
 *
 * Modified on 28-February-2024 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace BitApps\SMTP\Dependencies\BitApps\WPKit\Utils;

use BitApps\SMTP\Dependencies\BitApps\WPKit\Hooks\Hooks;

final class Capabilities
{
    public static function check($cap, ...$args)
    {
        return current_user_can($cap, ...$args);
    }

    public static function filter($cap, $default = 'manage_options')
    {
        return static::check($cap) || static::check(Hooks::applyFilter($cap, $default));
    }
}
