<?php

use App\Http\Controllers\ChungMinhThuController;
use App\Http\Controllers\KhaiTuController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HoKhauController;
use App\Http\Controllers\SuKienController;
use App\Http\Controllers\TamTruController;
use App\Http\Controllers\PhanQuaController;
use App\Http\Controllers\TamVangController;
use App\Http\Controllers\ThongKeController;
use App\Http\Controllers\NhanKhauController;
use App\Http\Controllers\DuocNhanThuongController;

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

Route::group(['prefix' => 'ho-khau'], function ($router) {
    Route::get('/', [HoKhauController::class, 'index']);
    Route::get('/{idHoKhau}', [HoKhauController::class, 'show']);
    Route::post('/{idHoKhau}/edit/tach-ho-khau', [HoKhauController::class, 'tachHoKhau']);
});

Route::group(['prefix' => 'nhan-khau'], function($router) {
    Route::get('/', [NhanKhauController::class, 'index']);
    Route::get('/{idNhanKhau}', [NhanKhauController::class, 'show']);
    Route::post('/create', [NhanKhauController::class, 'store']);
    Route::put('/{idNhanKhau}/edit', [NhanKhauController::class, 'update']);

    Route::get('/{idNhanKhau}/tam-tru', [TamTruController::class, 'show']);
    Route::get('/{idNhanKhau}/tam-vang', [TamVangController::class, 'show']);
    Route::post('/{idNhanKhau}/tam-tru/create', [TamTruController::class, 'store']);
    Route::post('/{idNhanKhau}/tam-vang/create', [TamVangController::class, 'store']);

    Route::post('/{idNguoiChet}/khai-tu', [KhaiTuController::class, 'store']);

    Route::post('/{idNhanKhau}/chung-minh-thu/create', [ChungMinhThuController::class, 'store']);

    Route::delete('/{idNhanKhau}/delete', [NhanKhauController::class, 'destroy']);

});

Route::group(['prefix' => 'khai-tu'], function ($router) {
    Route::get('/', [KhaiTuController::class, 'index']);
    Route::delete('/{idKhaiTu}/delete', [KhaiTuController::class, 'destroy']);
});

Route::group(['prefix' => 'tam-tru'], function ($router) {
    Route::get('/', [TamTruController::class, 'index']);
    Route::delete('/{idTamTru}', [TamTruController::class, 'destroy']);
});

Route::group(['prefix' => 'thong-ke'], function($router) {
    Route::get('/nhan-khau/tuoi', [ThongKeController::class, 'thongKeTheoTuoi']);
    Route::get('/nhan-khau/gioi-tinh', function(){});
    Route::get('/nhan-khau/tam-tru-tam-vang', function(){});
});

Route::group(['prefix' => 'su-kien'], function($router) {
    Route::get('/', [SuKienController::class, 'index']); //DONE
    Route::get('/{idSuKien}', [SuKienController::class, 'show']); //DONE
    Route::post('/create', [SuKienController::class, 'store']); //UNDONE
    Route::put('/{idSuKien}/edit', [SuKienController::class, 'update']); //UNDONE
    Route::post('/{idSuKien}/duoc-nhan-thuong/create', [DuocNhanThuongController::class, 'store']); //UNDONE
    Route::get('/{idSuKien}/thong-ke-ho-khau', [SuKienController::class, 'thongKeHoKhau']);
    Route::get('/{idSuKien}/thong-ke-phan-qua', [SuKienController::class, 'thongKeItems']);
    Route::delete('/{idSuKien}/delete', [SuKienController::class, 'destroy']);
});

Route::group(['prefix' => 'nhan-thuong'], function($router) {
    Route::put('/{idDuocNhanThuong}/edit', [DuocNhanThuongController::class, 'update']);
    Route::delete('/{idDuocNhanThuong}/delete', [DuocNhanThuongController::class, 'destroy']);
});

// Route::group(['prefix' => 'phan-qua'], function($router) {
//     Route::get('/', [PhanQuaController::class, 'index']);
//     Route::get('/{idPhanQua}', [PhanQuaController::class, 'show']);
//     Route::get('/create', [PhanQuaController::class, 'store']);
//     Route::get('/edit', [PhanQuaController::class, 'update']);
// });