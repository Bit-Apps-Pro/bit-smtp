<?php

namespace BitApps\SMTP\Model;

use BitApps\SMTP\Deps\BitApps\WPDatabase\Model;

/**
 * Model for log
 *
 * @property int    $status
 * @property int    $retry_count
 * @property array  $details
 * @property string $message
 * @property string $created_at
 * @property string $updated_at
 */
class Log extends Model
{
    public const SUCCESS = 1;

    public const ERROR   = 0;

    public $casts = [
        'details'     => 'array',
        'status'      => 'int',
        'retry_count' => 'int',
    ];

    protected $fillable = [
        'status',
        'message',
        'details',
        'retry_count',
    ];
}
