<?php

namespace BitApps\SMTP\HTTP\Requests;

use BitApps\SMTP\Deps\BitApps\WPKit\Http\Request\Request;

class MailTestRequest extends Request
{
    public function rules()
    {
        return
            [
                'to'      => ['required', 'email', 'sanitize:text'],
                'subject' => ['required', 'sanitize:text'],
                'message' => ['required', 'sanitize:text'],
            ];
    }

    public function messages()
    {
        return [
            'to.required'      => 'To Email Address is required',
            'subject.required' => 'Subject is required',
            'message.required' => 'Message is required',
        ];
    }
}
