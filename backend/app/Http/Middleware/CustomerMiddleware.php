<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CustomerMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user() || !($request->user() instanceof \App\Models\Customer)) {
            abort(401, 'Unauthorized. Please login as a customer.');
        }
        return $next($request);
    }
}
