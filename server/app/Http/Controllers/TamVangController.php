<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\TamVang;
use App\Models\NhanKhau;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\JsonResponse;

class TamVangController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $TamVangs = TamVang::all();

            if ($TamVangs) {
                return response()->json([
                    'data' => $TamVangs,
                    'success' => true,
                    'message' => 'success',
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
            ]);
        }
    }

    public function show($idNhanKhau)
    {
        try {
            $nhanKhau = NhanKhau::with('tamVangs')
                ->find($idNhanKhau);

            if (!$nhanKhau) {
                return response()->json([
                    'sucess' => false,
                    'message' => 'Nhan Khau not found',
                ], 404);
            }

            return response()->json([
                'data' => $nhanKhau,
                'success' => true,
                'message' => 'Get Nhan Khau with all Tam Tru(s) successfully',
            ], 200);

        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }

    public function store($idNhanKhau, Request $request)
    {
        $rules = [
            'maGiayTamVang' => 'required|string',
            'noiTamTru' => 'required|string',
            'tuNgay' => 'date|required|after:yesterday',
            'denNgay' => 'date|required|after:tuNay',
            'lyDo' => 'string|required',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(
                [
                    'data' => $validator->errors(),
                    'success' => false,
                    'message' => 'Validation Error',
                ],
                400
            );
        }

        try {
            $tamVang = TamVang::create([
                'idNhanKhau' => $idNhanKhau,
                'maGiayTamVang' => $request->maGiayTamVang,
                'noiTamTru' => $request->noiTamTru,
                'tuNgay' => $request->tuNgay,
                'denNgay' => $request->denNgay,
                'lyDo' => $request->lyDo,
            ]);

            $tamVang->nhanKhau;

            return response()->json([
                'data' => $tamVang,
                'success' => true,
                'message' => 'Created Tam Vang for Nhan Khau successfully',
            ], 200);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }

    public function update(Request $request, $idTamVang)
    {
        try {
            //
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }

    public function destroy($idTamVang)
    {
        try {
            $tamVang = TamVang::find($idTamVang);
            if (!$tamVang) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tam Tru not found',
                ], 404);
            }

            $tamVang->delete();

            return response()->json([
                'success' => true,
                'message' => 'Deleted Tam Tru successfully',
            ]);

        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }
}