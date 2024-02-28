<?php

namespace BitApps\SMTP\Model;

use BitApps\WPKit\Database\Model;

class Platform extends Model
{
    protected $fillable = [
        'id',
        'app_name',
        'platform_type',
    ];
}
