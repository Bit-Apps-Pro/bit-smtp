<?php

namespace BitApps\SMTP\HTTP\Middleware;

use BitApps\SMTP\Deps\BitApps\WPKit\Http\Request\Request;
use BitApps\SMTP\Deps\BitApps\WPKit\Http\Response;
use BitApps\SMTP\Deps\BitApps\WPKit\Utils\Capabilities;

final class NonceCheckerMiddleware
{
    public function handle(Request $request, ...$params)
    {
        if (!Capabilities::check('manage_options')) {
            return Response::error([])->message('unauthorized access');
        }

        return true;
    }
}
