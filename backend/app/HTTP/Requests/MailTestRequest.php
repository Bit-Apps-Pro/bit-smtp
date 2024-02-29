<?php

namespace BitApps\SMTP\HTTP\Requests;

use BitApps\WPKit\Http\Request\Request;

class MailTestRequest extends Request
{
    public function rules()
    {
        return
            [
                'to'                      => ['required'],
                'subject'                 => ['required'],
                'message'                 => ['required'],
            ];
    }

    public function messages()
    {
        return [
            'to'                            => 'To Email Address is required',
            'subject'                       => 'Subject is required',
            'message'                       => 'Message is required',
        ];
    }
}
