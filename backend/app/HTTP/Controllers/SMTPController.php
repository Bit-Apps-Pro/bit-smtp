<?php

namespace BitApps\SMTP\HTTP\Controllers;

use BitApps\SMTP\Config;
use BitApps\SMTP\Deps\BitApps\WPKit\Helpers\Arr;
use BitApps\SMTP\Deps\BitApps\WPKit\Http\Request\Request;
use BitApps\SMTP\Deps\BitApps\WPKit\Http\Response;
use BitApps\SMTP\Deps\BitApps\WPKit\Utils\Capabilities;
use BitApps\SMTP\HTTP\Requests\MailConfigStoreRequest;
use BitApps\SMTP\HTTP\Requests\MailTestRequest;
use BitApps\SMTP\Plugin;
use Exception;

class SMTPController
{
    public function index()
    {
        $mailConfig = Plugin::instance()->mailConfigService()->load();

        return Response::success(['mailConfig' => $mailConfig->getAll()]);
    }

    public function saveMailConfig(MailConfigStoreRequest $request)
    {
        $validated = $request->validated();

        $mailConfig = Plugin::instance()->mailConfigService()->load();

        $mailConfig->setStatus(Arr::get($validated, 'status'));
        $mailConfig->setFromEmailAddress(Arr::get($validated, 'from_email_address'));
        $mailConfig->setFromName(Arr::get($validated, 'from_name'));
        $mailConfig->setReEmailAddress(Arr::get($validated, 're_email_address'));
        $mailConfig->setSmtpHost(Arr::get($validated, 'smtp_host'));
        $mailConfig->setEncryption(Arr::get($validated, 'encryption'));
        $mailConfig->setPort(Arr::get($validated, 'port'));
        $mailConfig->setSmtpAuth(Arr::get($validated, 'smtp_auth'));
        $mailConfig->setSmtpDebug(Arr::get($validated, 'smtp_debug'));
        $mailConfig->setSmtpUserName(Arr::get($validated, 'smtp_user_name'));
        $mailConfig->setSmtpPassword(Arr::get($validated, 'smtp_password'));

        Plugin::instance()->mailConfigService()->store();

        return Response::success('SMTP config saved successfully');
    }

    public function sendTestEmail(MailTestRequest $request)
    {
        $queryParams = $request->validated();

        try {
            $smtpProvider = Plugin::instance()->smtpProvider();
            $smtpProvider->setDebug(true);

            wp_mail($queryParams['to'], $queryParams['subject'], $queryParams['message']);

            if ($smtpProvider->isFailed() === false) {
                $previousData = Config::getOption('test_mail_form_submitted');
                if (!$previousData) {
                    $previousData = 1;
                } else {
                    $previousData = (int) $previousData + 1;
                }
                Config::updateOption('test_mail_form_submitted', $previousData);

                return Response::success('Mail sent successfully');
            }

            return Response::message('Mail send testing failed')->error($smtpProvider->getDebugOutput());
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
        if (!Capabilities::check('manage_options')) {
            // double check to prevent misuse
            return Response::error([])->message('unauthorized access');
        }

        $validatedIds = array_map(function ($id) {
            return \intval($id);
        }, $request->ids);
        if (empty($validatedIds)) {
            return Response::error(__('Invalid log ID', 'bit-smtp'));
        }

        $smtpProvider = Plugin::instance()->smtpProvider();

        $logs = Plugin::instance()->logger()->getBulk($validatedIds);
        if (empty($logs)) {
            return Response::error(__('Log not found', 'bit-smtp'));
        }
        foreach ($logs as $log) {
            $smtpProvider->retry()->setRetryLogId($log->id)->setDebug(true);
            $message     = Arr::get($log->details, 'message', '');
            $headers     = Arr::get($log->details, 'headers', '');
            $attachments = Arr::get($log->details, 'attachments', []);

            wp_mail($log->to_addr, $log->subject, $message, $headers, $attachments);
        }

        if ($smtpProvider->isFailed() === false) {
            return Response::success(__('Mail resent', 'bit-smtp'));
        }

        return Response::message(__('Failed to resend mail', 'bit-smtp'))->error($smtpProvider->getDebugOutput());
    }
}
