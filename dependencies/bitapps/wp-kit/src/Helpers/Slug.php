<?php
/**
 * @license GPL-2.0-or-later
 *
 * Modified on 28-February-2024 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace BitApps\SMTP\Dependencies\BitApps\WPKit\Helpers;

class Slug
{
    public static function generate($text)
    {
        $text = preg_replace('/[^a-zA-Z0-9]+/', '-', $text);

        return strtolower(trim($text, '-'));
    }
}
