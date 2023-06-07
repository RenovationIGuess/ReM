<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PhanQuaController;
use App\Http\Controllers\SuKienController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HoKhauController;
use App\Http\Controllers\NhanKhauController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'auth'], function ($router) {
    
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
});

Route::group(['prefix' => 'nhan-khau'], function($router) {
    Route::get('/', [NhanKhauController::class, 'index']);
    Route::get('/{idNhanKhau}', [NhanKhauController::class, 'show']);
    Route::post('/create', [NhanKhauController::class, 'store']);
    Route::post('/{idNhanKhau}/tam-tru/create', function () {});
});

Route::group(['prefix' => 'su-kien'], function($router) {
    Route::get('/', [SuKienController::class, 'index']);
    Route::get('/{idSuKien}', [SuKienController::class, 'show']);
    Route::post('/create', [SuKienController::class, 'store']);
    Route::put('/edit', [SuKienController::class, 'update']);
});

Route::group(['prefix' => 'phan-qua'], function($router) {
    Route::get('/', [PhanQuaController::class, 'index']);
    Route::get('/{idPhanQua}', [PhanQuaController::class, 'show']);
    Route::get('/create', [PhanQuaController::class, 'store']);
    Route::get('/edit', [PhanQuaController::class, 'update']);
});