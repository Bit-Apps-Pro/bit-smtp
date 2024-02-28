<?php
/**
 * @license MIT
 *
 * Modified on 28-February-2024 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */
namespace BitApps\SMTP\Dependencies\BitApps\WPValidator\Rules;

use BitApps\SMTP\Dependencies\BitApps\WPValidator\Rule;

class NullableRule extends Rule
{

    private $message = '';

    public function validate($value)
    {
        return true;
    }

    public function message()
    {
        return $this->message;
    }
}
