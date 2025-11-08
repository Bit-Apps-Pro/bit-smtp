<?php

namespace BitApps\SMTP\HTTP\Controllers;

use BitApps\SMTP\Config;
use BitApps\SMTP\Deps\BitApps\WPKit\Http\Request\Request;
use BitApps\SMTP\Deps\BitApps\WPTelemetry\Telemetry\Telemetry;

class TelemetryPopupController
{
    public function filterTrackingData($additional_data)
    {
        $totalTestMailFormSubmitted                  = Config::getOption('test_mail_form_submitted');
        $additional_data['test_mail_form_submitted'] = $totalTestMailFormSubmitted;

        return $additional_data;
    }

    public function handleTelemetryPermission(Request $request)
    {
        if ($request->isChecked == true) {
            Telemetry::report()->trackingOptIn();
            Config::updateOption('old_version', Config::VERSION);

            return true;
        }

        Telemetry::report()->trackingOptOut();
        Config::updateOption('old_version', Config::VERSION);

        return false;
    }

    public function isPopupDisabled()
    {
        $allowed = Telemetry::report()->isTrackingAllowed();
        if ($allowed == true) {
            return true;
        }

        $popupSkipped             = Config::getOption('tracking_skipped');
        $getOldPluginVersion      = Config::getOption('old_version');

        return (bool) (($popupSkipped == true) && $getOldPluginVersion === Config::VERSION);
    }
}
