<?php

namespace BitApps\SMTP\HTTP\Controllers;

use BitApps\WPKit\Http\Response;
use BitApps\SMTP\HTTP\Requests\MailConfigStoreRequest;
use BitApps\SMTP\HTTP\Requests\MailTestRequest;
use Exception;

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
        update_option('bit_smtp_options', $request->validated());
        return Response::success('SMTP config saved successfully');

    }

    public function sendTestEmail(MailTestRequest $request)
    {
        if (!$request->validated()) {
            return Response::error($request->errors());
        }
        $queryParams = $request->validated();
        $to = isset($queryParams['to']) ? sanitize_email($queryParams['to']) : '';
        $subject = isset($queryParams['subject']) ? sanitize_text_field($queryParams['subject']) : '';
        $message = isset($queryParams['message']) ? sanitize_text_field($queryParams['message']) : '';

        if (!empty($to) && is_email($to) && !empty($subject) && !empty($message)) {

            try {
                add_action('wp_mail_failed', function ($error) {
                    $errors = $error->errors['wp_mail_failed'];
                    return Response::error($errors[0]);
                });

                $result = wp_mail($to, $subject, $message);
                if($result) {
                    return Response::success('Mail sent successfully');
                }
                return Response::error('Mail send testing failed');

            } catch (Exception $e) {
                $error = $e->getMessage();
                return Response::error($error);
            }
        } else {
            return Response::error('Some of the test fields are empty or an invalid email supplied');
        }

    }
}
