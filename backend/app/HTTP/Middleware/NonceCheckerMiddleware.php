<?php

namespace BitApps\SMTP\HTTP\Middleware;

use BitApps\WPKit\Http\Request\Request;
use BitApps\WPKit\Http\Response;

final class NonceCheckerMiddleware
{
    public function handle(Request $request, ...$params)
    {
        if (! $request->has('_ajax_noce') || wp_verify_nonce(sanitize_key($request->_ajax_noce), 'bitdoc_noce')) {
            // return Response::error('Invalid token')->httpStatus(411);
        }

        return true;
    }
}
