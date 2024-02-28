<?php
/**
 * @license MIT
 *
 * Modified on 28-February-2024 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */
namespace BitApps\SMTP\Dependencies\BitApps\WPValidator\Rules;

use BitApps\SMTP\Dependencies\BitApps\WPValidator\Rule;

class DigitBetweenRule extends Rule
{
    protected $message = "The :attribute must be between :min and :max digits";

    protected $requireParameters = ['min', 'max'];

    public function validate($value)
    {
        $this->checkRequiredParameter($this->requireParameters);

        $min = (int) $this->getParameter('min');
        $max = (int) $this->getParameter('max');

        if (!preg_match('/[^0-9]/', $value)) {
            $length = \strlen($value);

            return $length >= $min && $length <= $max;
        }
        return false;
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
