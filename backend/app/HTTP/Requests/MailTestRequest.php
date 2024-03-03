<?php

namespace BitApps\SMTP\HTTP\Requests;

use BitApps\WPKit\Http\Request\Request;

class MailTestRequest extends Request
{
    public function rules()
    {
        error_log(get_class($this));
        error_log('Rules ');
        return
            [
            'to' => ['required'],
            'subject' => ['required'],
            'message' => ['required'],
        ];
    }

    public function messages()
    {
        return [
            'to.required' => 'To Email Address is required',
            'subject.required' => 'Subject is required',
            'message.required' => 'Message is required',
        ];
    }
}
