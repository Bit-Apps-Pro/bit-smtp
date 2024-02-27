<?php

namespace BitApps\BMI\HTTP\Middleware;

use BitApps\BMI\Core\Http\Request\Request;
use BitApps\BMI\Core\Http\Response;

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
