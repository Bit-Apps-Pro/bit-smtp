<?php

namespace BitApps\BMI\HTTP\Controllers;

use BitApps\BMI\Core\Http\Response;
use BitApps\BMI\HTTP\Requests\MailConfigStoreRequest;

class SMTPController
{
    public function index()
    {
        $mailConfig = get_option('bit_smtp_options');

        return Response::success(['mailConfig' => $mailConfig]);
    }

        public function saveMailConfig(MailConfigStoreRequest $request)
        {
            if (!$request->validated()) {
                return Response::error($request->errors());
            }
            $result = update_option('bit_smtp_options', $request->all());

            if ($result) {
                return Response::success('SMTP config saved successfully');
            }

            return Response::error('SMTP config saved failed');
        }
}
