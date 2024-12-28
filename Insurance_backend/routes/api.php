<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\PolicyController;






Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/login', [UserController::class, 'login']);
Route::post('/register', action: [UserController::class, 'register']);
Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'logout']);

Route::get('/policies', [PolicyController::class, 'index']);
Route::post('/policies', [PolicyController::class, 'store']);
Route::put('/policies/{policy}', [PolicyController::class, 'update']);
Route::delete('/policies/{policy}', [PolicyController::class, 'destroy']);