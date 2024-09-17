<?php

namespace BitApps\SMTP\HTTP\Controllers;

use BitApps\SMTP\Config;
use BitApps\SMTP\Deps\BitApps\WPTelemetry\Telemetry\Telemetry;
use BitApps\SMTP\HTTP\Requests\TelemetryAccessRequest;

final class SMTPAnalyticsController
{
    public function filterTrackingData($additional_data)
    {
        $totalTestMailFormSubmitted                  = get_option(Config::VAR_PREFIX . 'test_mail_form_submitted');
        $additional_data['test_mail_form_submitted'] = $totalTestMailFormSubmitted;

        return $additional_data;
    }

    public function telemetryPermissionHandle(TelemetryAccessRequest $request)
    {
        if ($request->isChecked == true) {
            Telemetry::report()->trackingOptIn();
            update_option(Config::VAR_PREFIX . 'old_version', Config::VERSION);

            return true;
        }

        Telemetry::report()->trackingOptOut();
        update_option(Config::VAR_PREFIX . 'old_version', Config::VERSION);

        return false;
    }

    public function telemetryPopupDisableCheck()
    {
        $allowed = Telemetry::report()->isTrackingAllowed();
        if ($allowed == true) {
            return true;
        }

        $skipped             = get_option(Config::VAR_PREFIX . 'tracking_skipped');
        $getOldPluginVersion = get_option(Config::VAR_PREFIX . 'old_version');

        return (bool) ($skipped == true && $getOldPluginVersion === Config::VERSION);
    }
}
