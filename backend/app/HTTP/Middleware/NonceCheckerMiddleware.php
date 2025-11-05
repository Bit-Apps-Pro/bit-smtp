<?php

namespace BitApps\SMTP\HTTP\Middleware;

use BitApps\SMTP\Config;
use BitApps\SMTP\Deps\BitApps\WPKit\Http\Request\Request;
use BitApps\SMTP\Deps\BitApps\WPKit\Http\Response;
use BitApps\SMTP\Deps\BitApps\WPKit\Utils\Capabilities;

final class NonceCheckerMiddleware
{
    public function handle(Request $request, ...$params)
    {
        if (!$request->has('_ajax_nonce') || !wp_verify_nonce(sanitize_key($request->_ajax_nonce), Config::VAR_PREFIX . 'nonce')) {
            return Response::error('Invalid token')->httpStatus(411);
        }


        if (!Capabilities::check('manage_options')) {
            return Response::error([])->message('unauthorized access');
        }

        return true;
    }
}
