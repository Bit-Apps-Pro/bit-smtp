<?php

namespace BitApps\BMI\Model;

use BitApps\BMI\Core\Database\Model;

class Platform extends Model
{
    protected $fillable = [
        'id',
        'app_name',
        'platform_type',
    ];
}
