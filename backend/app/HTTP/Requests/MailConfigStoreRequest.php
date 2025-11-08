<?php

namespace BitApps\SMTP\HTTP\Requests;

use BitApps\SMTP\Deps\BitApps\WPKit\Http\Request\Request;

class MailConfigStoreRequest extends Request
{
    public function rules()
    {
        return
            [
                'status'              => ['required', 'boolean'],
                'from_email_address'  => ['nullable','email', 'sanitize:email'],
                'from_name'           => ['nullable','string', 'sanitize:text'],
                're_email_address'    => ['nullable','email', 'sanitize:email'],
                'smtp_host'           => ['nullable','string', 'sanitize:text'],
                'encryption'          => ['nullable','string', 'sanitize:text'],
                'port'                => ['nullable','integer'],
                'smtp_auth'           => ['nullable','boolean'],
                'smtp_debug'          => ['nullable','boolean'],
                'smtp_user_name'      => ['nullable','string', 'sanitize:text'],
                'smtp_password'       => ['nullable','string', 'sanitize:text'],
            ];
    }

    public function messages()
    {
        return [
            'status.required'              => 'Status is required',
            'from_email_address.required'  => 'Form email address is required',
            'from_name.required'           => 'Form name is required',
            'smtp_host.required'           => 'SMTP host is required',
            'encryption.required'          => 'Encryption is required',
            'port.required'                => 'Port is required',
            'smtp_auth.required'           => 'SMTP auth is required',
            'smtp_debug.required'          => 'SMTP debug is required',
            'smtp_user_name.required'      => 'SMTP user name is required',
            'smtp_password.required'       => 'SMTP password is required',
        ];
    }
}
