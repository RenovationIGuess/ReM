<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\KhaiTu;
use App\Models\NhanKhau;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\JsonResponse;

class KhaiTuController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $TamTrus = KhaiTu::with('nguoiChet', 'nguoiKhaiTu')
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

    public function store($idNguoiChet, Request $request)
    {
        $rules = [
            'soGiayKhaiTu' => 'string|required',
            'ngayChet' => 'date|required',
            'lyDoChet' => 'string|required',
            'idNguoiTao' => 'required|numeric',
            'idNguoiKhaiTu' => 'required|numeric',
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

            $nhanKhau = NhanKhau::find($idNguoiChet);
            $nhanKhau->note = "Đã qua đời";
            $nhanKhau->save();

            $khaiTu = KhaiTu::create([
                'soGiayKhaiTu' => $request->soGiayKhaiTu,
                'ngayChet' => $request->ngayChet,
                'lyDoChet' => $request->lyDoChet,
                'idNguoiTao' => $request->idNguoiTao,
                'idNguoiChet' => $idNguoiChet,
                'idNguoiKhaiTu' => $request->idNguoiKhaiTu,
            ]);

            return response()->json([
                'data' => $khaiTu,
                'success' => true,
                'message' => 'Khai Tu cho 1 Nhan Khau thanh cong',
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

    public function destroy($idKhaiTu)
    {
        try {
            $khaiTu = KhaiTu::find($idKhaiTu);
            if (!$khaiTu) {
                return response()->json([
                    'success' => false,
                    'message' => 'Khai Tu not found',
                ], 404);
            }

            $khaiTu->delete();

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
