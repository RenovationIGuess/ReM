<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class JWTAuthentication
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return JsonResponse|RedirectResponse|Response|mixed
     */
    public function handle(Request $request, Closure $next): mixed
    {
        try {
            JWTAuth::parseToken()->authenticate();
            return $next($request);
        } catch (TokenExpiredException $e) {
            return response()->json([
                'message' => 'Token Expired',
            ], 403);
        } catch (TokenInvalidException $e) {
            return response()->json([
                'message' => 'Token Invalid',
            ], 401);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Token Not Found',
            ], 401);
        } 
    }
}