<?php
/**
 * @license MIT
 *
 * Modified on 28-February-2024 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */
namespace BitApps\SMTP\Dependencies\BitApps\WPValidator\Rules;

use BitApps\SMTP\Dependencies\BitApps\WPValidator\Rule;

class DigitsRule extends Rule
{
    private $message = "The :attribute must be :digits digits";

    private $requireParameters = ['digits'];

    public function validate($value)
    {
        $this->checkRequiredParameter($this->requireParameters);

        $digitCount = $this->getParameter('digits') ? $this->getParameter('digits') : 0;

        return !preg_match('/[^0-9]/', $value) && strlen((string) $value) === (int) $digitCount;

    }

    public function getParamKeys()
    {
        return $this->requireParameters;
    }

    public function message()
    {
        return $this->message;
    }
}
