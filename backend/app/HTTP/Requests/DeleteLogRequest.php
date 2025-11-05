<?php

namespace BitApps\SMTP\HTTP\Requests;

use BitApps\SMTP\Deps\BitApps\WPKit\Http\Request\Request;
use BitApps\SMTP\Deps\BitApps\WPKit\Utils\Capabilities;

class DeleteLogRequest extends Request
{
    public function authorize()
    {
        return Capabilities::filter('bitapps_smtp_can_delete_log', 'manage_options');
    }

    public function rules()
    {
        return [
            'ids' => ['required','array']
        ];
    }
}
