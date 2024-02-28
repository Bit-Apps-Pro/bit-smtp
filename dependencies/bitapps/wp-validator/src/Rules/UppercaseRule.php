<?php
/**
 * @license MIT
 *
 * Modified on 28-February-2024 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */
namespace BitApps\SMTP\Dependencies\BitApps\WPValidator\Rules;

use BitApps\SMTP\Dependencies\BitApps\WPValidator\Rule;

class UppercaseRule extends Rule
{
    private $message = "The :attribute must be in uppercase";

    public function validate($value)
    {
        return $value === strtoupper($value);
    }

    public function message()
    {
        return $this->message;
    }
}
