<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\ChungMinhThu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\JsonResponse;

class ChungMinhThuController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $limit = $request->has('limit') ? $request->input('limit') : 10;
            $chungMinhThus = ChungMinhThu::with('nhanKhau')
                ->where('noiCap', 'like', '%' . $request->noiCap . '%')
                ->where('soCMT', 'like', $request->soCMT . '%')
                ->orderBy('id', 'ASC')
                ->paginate($limit);

            if ($chungMinhThus) {
                return response()->json([
                    'data' => $chungMinhThus,
                    'success' => true,
                    'message' => 'Lấy danh sách tất cả chứng minh thư thành công',
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

    public function show($id): JsonResponse
    {
        try {
            $chungMinhThu = ChungMinhThu::with('nhanKhau')
                ->find($id);
            if ($chungMinhThu) {
                return response()->json([
                    'data' => $chungMinhThu,
                    'success' => true,
                    'message' => 'Lấy dữ liệu chứng minh thư thành công',
                ], 200);
            }

            return response()->json([
                'sucess' => false,
                'message' => 'Không tìm thấy nhân khẩu',
            ], 404);

        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public function store($idNhanKhau, Request $request)
    {
        $rules = [
            'soCMT' => 'numeric|required',
            'ngayCap' => 'date|required',
            'noiCap' => 'string|required',
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
            $ChungMinhThu = ChungMinhThu::create([
                'idNhanKhau' => $idNhanKhau,
                'soCMT' => $request->soCMT,
                'ngayCap' => $request->ngayCap,
                'noiCap' => $request->noiCap,
            ]);

            return response()->json([
                'data' => $ChungMinhThu,
                'success' => true,
                'message' => 'Thêm chứng minh thư cho nhân khẩu thành công',
            ], 200);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public function update($idNhanKhau, Request $request)
    {
        $rules = [
            'soCMT' => 'numeric|required',
            'ngayCap' => 'date|required',
            'noiCap' => 'string|required',
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
            $ChungMinhThu = $idNhanKhau->chungMinhThu;

            if (!$ChungMinhThu) {
                return response()->json([
                    'success' => false,
                    'message' => 'Nhân Khẩu này chưa có chứng minh thư',
                ], 404);
            }
            $ChungMinhThu->soCMT = $request->soCMT;
            $ChungMinhThu->ngayCap = $request->ngayCap;
            $ChungMinhThu->noiCap = $request->noiCap;
            $ChungMinhThu->save();

            return response()->json([
                'data' => $ChungMinhThu,
                'success' => true,
                'message' => 'Cập nhật chứng minh thư thành công',
            ], 200);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public function destroy($idChungMinhThu)
    {
        try {
            $chungMinhThu = ChungMinhThu::find($idChungMinhThu);
            if (!$chungMinhThu) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy chứng minh thư',
                ], 404);
            }

            $chungMinhThu->delete();

            return response()->json([
                'success' => true,
                'message' => 'Xóa chứng minh thư thành công',
            ], 200);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }
}