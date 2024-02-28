<?php
/**
 * @license MIT
 *
 * Modified on 28-February-2024 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace BitApps\SMTP\Dependencies\BitApps\WPValidator\Rules;

use BitApps\SMTP\Dependencies\BitApps\WPValidator\Rule;

class StringRule extends Rule
{
    protected $message = "The :attribute field should be string";

    public function validate($value)
    {
        return is_string($value);
    }

    public function message()
    {
        return $this->message;
    }
}
