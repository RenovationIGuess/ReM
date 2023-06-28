<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\PhanThuong;
use Illuminate\Http\Request;

class PhanThuongController extends Controller
{
    public function index(Request $request)
    {
        try {
            $limit = $request->has('limit') ? $request->input('limit') : 10;

            $phanThuongs = PhanThuong::all();

            if ($phanThuongs) {
                return response()->json([
                    'data' => $phanThuongs,
                    'success' => true,
                    'message' => 'Get Items successfully',
                ], 200);
            }

            return response()->json([
                'success' => false,
                'message' => 'No data',
            ], 404);

        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public function show($idPhanQua)
    {
        try {
            $phanThuong = PhanThuong::find($idPhanQua);

            if ($phanThuong) {
                return response()->json([
                    'data' => $phanThuong,
                    'success' => true,
                    'message' => 'success',
                ], 200);
            }
            return response()->json([
                'success' => false,
                'message' => 'Item not found',
            ], 404);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }
}
