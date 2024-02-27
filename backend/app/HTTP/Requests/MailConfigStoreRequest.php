<?php

namespace BitApps\BMI\HTTP\Requests;

use BitApps\BMI\Core\Http\Request\Request;

class MailConfigStoreRequest extends Request
{
    public function rules()
    {
        return
            [
                'status'                                                        => ['required'],
                'form_email_address'                                            => ['required'],
                'form_name'                                                     => ['required'],
                're_email_address'                                              => [],
                'smtp_host'                                                     => ['required'],
                'encryption'                                                    => ['required'],
                'port'                                                          => ['required'],
                'smtp_auth'                                                     => [],
                'smtp_user_name'                                                => ['required'],
                'smtp_password'                                                 => ['required'],
            ];
    }

    public function messages()
    {
        return [
            'status'                        => 'Status is required',
            'form_email_address'            => 'Form email address is required',
            'form_name'                     => 'Form name is required',
            'smtp_host'                     => 'SMTP host is required',
            'encryption'                    => 'Encryption is required',
            'port'                          => 'Port is required',
            'smtp_user_name'                => 'SMTP user name is required',
            'smtp_password'                 => 'SMTP password is required',
        ];
    }
}
