<?php
/**
 * @license MIT
 *
 * Modified on 28-February-2024 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */

namespace BitApps\SMTP\Dependencies\BitApps\WPValidator\Rules;

use BitApps\SMTP\Dependencies\BitApps\WPValidator\Rule;

class JsonRule extends Rule
{
    private $message = "The :attribute must be a valid JSON string";

    public function validate($value)
    {
        json_decode($value);
        return json_last_error() === JSON_ERROR_NONE;
    }

    public function message()
    {
        return $this->message;
    }
}
