<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\TamTru;
use App\Models\NhanKhau;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\JsonResponse;

class TamTruController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $TamTrus = TamTru::with('nhanKhau')
                ->where('maGiayTamTru', 'like', $request->maGiayTamTru.'%')
                ->orderBy('id', 'ASC');

            if ($TamTrus) {
                return response()->json([
                    'data' => $TamTrus,
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

    public function show($idNhanKhau): JsonResponse
    {
        try {
            $nhanKhau = NhanKhau::with('tamTrus')
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
            'maGiayTamTru' => 'required|string',
            'soDienThoaiDangKy' => 'required|string',
            'tuNgay' => 'date|required|after:yesterday',
            'denNgay' => 'date|required|after:tuNay',
            'lyDo' => 'string|required',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails())
        {
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
            $tamTru = TamTru::create([
                'idNhanKhau' => $idNhanKhau,
                'maGiayTamTru' => $request->maGiayTamTru,
                'soDienThoaiDangKy' => $request->soDienThoaiDangKy,
                'tuNgay' => $request->tuNgay,
                'denNgay' => $request->denNgay,
                'lyDo' => $request->lyDo,
            ]);

            $tamTru->nhanKhau;

            return response()->json([
                'data' => $tamTru,
                'success' => true,
                'message' => 'Created Tam Tru for Nhan Khau successfully',
            ], 200);
        }
        catch (Exception $exception) 
        {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }

    public function update(Request $request, $idTamtru)
    {
        try {
            //
        } catch(Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }

    public function destroy($idTamtru)
    {
        try {
            $tamTru = TamTru::find($idTamtru);
            if (!$tamTru) {
                return response()->json([
                    'success' => false,
                    'message' => 'Tam Tru not found',
                ], 404);
            }

            $tamTru->delete();

            return response()->json([
                'success' => true,
                'message' => 'Deleted Tam Tru successfully',
            ]);

        } catch(Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }
}
