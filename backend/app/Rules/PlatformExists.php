<?php

namespace BitApps\BMI\Rules;

use BitApps\BMI\Core\Http\Request\Validator\Rule;
use BitApps\BMI\Model\Platform;

class PlatformExists implements Rule
{
    public function passes($attribute, $platformName)
    {
        $platform = Platform::where('app_name', $platformName)->first();

        return ! ($platform);
    }

    public function message()
    {
        return ':attribute is Already exists';
    }
}
