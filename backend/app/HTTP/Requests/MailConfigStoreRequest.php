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
                'form_email_address'  => ['required', 'email', 'sanitize:email'],
                'form_name'           => ['required', 'string', 'sanitize:text'],
                're_email_address'    => ['nullable', 'email', 'sanitize:email'],
                'smtp_host'           => ['required', 'string', 'sanitize:text'],
                'encryption'          => ['required', 'string', 'sanitize:text'],
                'port'                => ['required', 'integer'],
                'smtp_auth'           => ['required', 'boolean'],
                'smtp_debug'          => ['required', 'boolean'],
                'smtp_user_name'      => ['required', 'string', 'sanitize:text'],
                'smtp_password'       => ['required', 'string', 'sanitize:text'],
            ];
    }

    public function messages()
    {
        return [
            'status.required'              => 'Status is required',
            'form_email_address.required'  => 'Form email address is required',
            'form_name.required'           => 'Form name is required',
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
