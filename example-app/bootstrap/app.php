<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Fruitcake\Cors\HandleCors; // Add this import

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php', // Make sure this is included
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Add CORS middleware globally
        $middleware->append(HandleCors::class);
        
        // Or add it to specific middleware groups
        // $middleware->api(prepend: [HandleCors::class]);
        // $middleware->web(prepend: [HandleCors::class]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();