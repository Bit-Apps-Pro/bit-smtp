<?php

namespace BitApps\SMTP\Model;

use BitApps\SMTP\Deps\BitApps\WPDatabase\Model;

/**
 * Model for log
 *
 * @property int    $status
 * @property string $subject
 * @property array  $to_addr
 * @property string $from_addr
 * @property array  $details
 * @property array $debug_info
 * @property int $retry_count
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
        'int'    => 'status',
        'array'  => 'to_addr',
        'array'  => 'details',
        'array' => 'debug_info',
        'int' => 'retry_count',
    ];

    protected $fillable = [
        'status',
        'message',
        'details',
        'retry_count',
    ];
}
