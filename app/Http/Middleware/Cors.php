<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Cors
{
  public function handle(Request $request, Closure $next): Response
  {

    $allowedOrigin = 'http://localhost:5173';
    // If it’s a preflight (OPTIONS) request, you may return an empty response early
    if ($request->getMethod() === 'OPTIONS') {
      $response = response('', 204);
    } else {
      $response = $next($request);
    }

    $response->header('Access-Control-Allow-Origin', $allowedOrigin);
    $response->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    $response->header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization');
    // if you need credentials:
    $response->header('Access-Control-Allow-Credentials', 'true');

    return $response;
  }
}
