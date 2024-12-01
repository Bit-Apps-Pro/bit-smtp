<?php

namespace BitApps\SMTP\HTTP\Controllers;

use BitApps\SMTP\Config;
use BitApps\SMTP\Deps\BitApps\WPKit\Http\Response;
use BitApps\SMTP\HTTP\Requests\MailConfigStoreRequest;
use BitApps\SMTP\HTTP\Requests\MailTestRequest;
use Exception;

class SMTPController
{
    public function index()
    {
        $mailConfig = get_option(Config::VAR_PREFIX . 'options');

        return Response::success(['mailConfig' => $mailConfig]);
    }

    public function saveMailConfig(MailConfigStoreRequest $request)
    {
        update_option(Config::VAR_PREFIX . 'options', $request->validated());

        return Response::success('SMTP config saved successfully');
    }

    public function sendTestEmail(MailTestRequest $request)
    {
        $queryParams = $request->validated();

        try {
            add_action('wp_mail_failed', function ($error) {
                $errors = $error->errors['wp_mail_failed'];

                return Response::error($errors[0]);
            });

            $result = wp_mail($queryParams['to'], $queryParams['subject'], $queryParams['message']);
            if ($result) {
                $previousData = get_option(Config::VAR_PREFIX . 'test_mail_form_submitted');
                if (!$previousData) {
                    $previousData = 1;
                } else {
                    $previousData = (int) $previousData + 1;
                }
                update_option(Config::VAR_PREFIX . 'test_mail_form_submitted', $previousData);

                return Response::success('Mail sent successfully');
            }

            return Response::error('Mail send testing failed');
        } catch (Exception $e) {
            $error = $e->getMessage();

            return Response::error($error);
        }
    }

    public function newProductNavBtnVisibleCheck()
    {
        $data = get_option(Config::VAR_PREFIX . 'new_product_nav_btn_hide');

        return (bool) ($data);
    }

    public function newProductNavBtnHide()
    {
        update_option(Config::VAR_PREFIX . 'new_product_nav_btn_hide', true);
    }
}
