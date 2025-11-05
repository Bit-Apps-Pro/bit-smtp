<?php

namespace BitApps\SMTP\HTTP\Controllers;

use BitApps\SMTP\Config;
use BitApps\SMTP\Deps\BitApps\WPKit\Helpers\Arr;
use BitApps\SMTP\Deps\BitApps\WPKit\Http\Request\Request;
use BitApps\SMTP\Deps\BitApps\WPKit\Http\Response;
use BitApps\SMTP\HTTP\Requests\MailConfigStoreRequest;
use BitApps\SMTP\HTTP\Requests\MailTestRequest;
use BitApps\SMTP\Plugin;
use Exception;

class SMTPController
{
    public function index()
    {
        $mailConfig = Config::getOption('options');

        return Response::success(['mailConfig' => $mailConfig]);
    }

    public function saveMailConfig(MailConfigStoreRequest $request)
    {
        Config::updateOption('options', $request->validated());

        return Response::success('SMTP config saved successfully');
    }

    public function sendTestEmail(MailTestRequest $request)
    {
        $queryParams = $request->validated();

        try {
            $mailConfigProvider = Plugin::instance()->mailConfigProvider();
            $mailConfigProvider->setDebug(true);

            wp_mail($queryParams['to'], $queryParams['subject'], $queryParams['message']);

            if ($mailConfigProvider->isFailed() === false) {
                $previousData = Config::getOption('test_mail_form_submitted');
                if (!$previousData) {
                    $previousData = 1;
                } else {
                    $previousData = (int) $previousData + 1;
                }
                Config::updateOption('test_mail_form_submitted', $previousData);

                return Response::success('Mail sent successfully');
            }

            return Response::message('Mail send testing failed')->error($mailConfigProvider->getDebugOutput());
        } catch (Exception $e) {
            $error = $e->getMessage();

            return Response::error($error);
        }
    }

    public function newProductNavBtnVisibleCheck()
    {
        $data = Config::getOption('new_product_nav_btn_hide');

        return (bool) ($data);
    }

    public function newProductNavBtnHide()
    {
        Config::updateOption('new_product_nav_btn_hide', true);
    }

    public function resend(Request $request)
    {
        $logId = \intval($request->id);
        $logId = intval($logId);
        if ($logId <= 0) {
            return Response::error('Invalid log ID');
        }

        $mailConfigProvider = Plugin::instance()->mailConfigProvider();
        $mailConfigProvider->retry()->setRetryLogId($logId)->setDebug(true);

        $log = Plugin::instance()->logger()->get($logId);
        if (!$log) {
            return Response::error('Log not found');
        }

        $message = Arr::get($log->details, 'message', '');
        $headers = Arr::get($log->details, 'headers', '');
        $attachments = Arr::get($log->details, 'attachments', []);

        error_log(print_r([$log->to, $log->subject, $message, $headers, $attachments], true));
        wp_mail($log->to_addr, $log->subject, $message, $headers, $attachments);

        if ($mailConfigProvider->isFailed() === false) {
            return Response::success(__('Mail resent', 'bit-smtp'));
        }

        return Response::message(__('Failed to resend mail', 'bit-smtp'))->error($mailConfigProvider->getDebugOutput());
    }
}
