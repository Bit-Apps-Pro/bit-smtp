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
                'from_email_address'  => ['email', 'sanitize:email'],
                'from_name'           => ['string', 'sanitize:text'],
                're_email_address'    => ['email', 'sanitize:email'],
                'smtp_host'           => ['string', 'sanitize:text'],
                'encryption'          => ['string', 'sanitize:text'],
                'port'                => ['integer'],
                'smtp_auth'           => ['boolean'],
                'smtp_debug'          => ['boolean'],
                'smtp_user_name'      => ['string', 'sanitize:text'],
                'smtp_password'       => ['string', 'sanitize:text'],
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
