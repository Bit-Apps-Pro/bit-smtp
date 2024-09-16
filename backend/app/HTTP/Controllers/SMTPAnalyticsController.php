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

            return true;
        }

        Telemetry::report()->trackingOptOut();

        return false;
    }

    public function telemetryPopupDisableCheck()
    {
        $skipped = get_option(Config::VAR_PREFIX . 'tracking_skipped');

        if ($skipped == true) {
            return true;
        }

        $allowed = Telemetry::report()->isTrackingAllowed();

        return (bool) ($allowed == true);
    }
}
