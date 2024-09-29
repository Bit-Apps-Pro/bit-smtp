<?php

namespace BitApps\SMTP\HTTP\Controllers;

use BitApps\SMTP\Config;
use BitApps\SMTP\Deps\BitApps\WPKit\Http\Request\Request;
use BitApps\SMTP\Deps\BitApps\WPTelemetry\Telemetry\Telemetry;

class TelemetryPopupController
{
    public function filterTrackingData($additional_data)
    {
        $totalTestMailFormSubmitted                  = get_option(Config::VAR_PREFIX . 'test_mail_form_submitted');
        $additional_data['test_mail_form_submitted'] = $totalTestMailFormSubmitted;

        return $additional_data;
    }

    public function handleTelemetryPermission(Request $request)
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

    public function isPopupDisabled()
    {
        $allowed = Telemetry::report()->isTrackingAllowed();
        if ($allowed == true) {
            return true;
        }

        $popupSkipped             = get_option(Config::VAR_PREFIX . 'tracking_skipped');
        $getOldPluginVersion      = get_option(Config::VAR_PREFIX . 'old_version');

        return (bool) (($popupSkipped == true) && $getOldPluginVersion === Config::VERSION);
    }
}
