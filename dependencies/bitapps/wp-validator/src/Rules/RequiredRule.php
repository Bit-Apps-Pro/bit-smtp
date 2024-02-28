<?php
/**
 * @license MIT
 *
 * Modified on 28-February-2024 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */
namespace BitApps\SMTP\Dependencies\BitApps\WPValidator\Rules;

use BitApps\SMTP\Dependencies\BitApps\WPValidator\Helpers;
use BitApps\SMTP\Dependencies\BitApps\WPValidator\Rule;

class RequiredRule extends Rule
{
    use Helpers;

    private $message = 'The :attribute field is required';

    public function validate($value)
    {
        return !$this->isEmpty($value);
    }

    public function message()
    {
        return $this->message;
    }
}
