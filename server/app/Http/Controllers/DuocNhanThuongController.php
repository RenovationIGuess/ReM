<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\SuKien;
use App\Models\PhanThuong;
use Illuminate\Http\Request;
use App\Models\DuocNhanThuong;
use Illuminate\Support\Facades\Validator;

class DuocNhanThuongController extends Controller
{
    public function index(Request $request)
    {
        try {
            $duocNhanThuongs = DuocNhanThuong::all();

            return response()->json([
                'data' => $duocNhanThuongs,
                'success' => true,
                'message' => 'Get all DuocNhanThuong successfully',
            ], 200);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public function show($idDuocNhanThuong)
    {
        try {
            $duocNhanThuong = DuocNhanThuong::find($idDuocNhanThuong);

            if (!$duocNhanThuong) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy danh sách nhận thưởng',
                ], 404);
            }

            return response()->json([
                'data' => $duocNhanThuong,
                'success' => true,
                'message' => 'Get DuocNhanThuong successfully',
            ], 200);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public function store($idSuKien, Request $request)
    {
        $rules = [
            'idNhanKhau' => 'required|numeric',
            'tenTruong' => 'string',
            'tenLop' => 'string',
            'anhGiayKhen' => 'string',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json(
                [
                    'data' => $validator->errors(),
                    'success' => false,
                    'message' => 'Validator Error',
                ],
                400
            );
        }

        try {

            $suKien = SuKien::find($idSuKien);
            if (!$suKien) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy sự kiện'
                ], 404);
            }

            $beAlreadyIn = DuocNhanThuong::where('idSuKien', $idSuKien)
                ->where('idNhanKhau', $request->idNhanKhau)
                ->first();

            if ($beAlreadyIn) {
                return response()->json([
                    'success' => false,
                    'message' => 'Đã có nhân khẩu này trong danh sách được nhận quà',
                ], 403);
            }

            $duocNhanThuong = null;
            if ($suKien->type == 1) {
                $phanThuong = PhanThuong::where('idSuKien', $idSuKien)
                    ->where('thanhTichHocTap', $request->thanhTichHocTap)
                    ->where('capHoc', $request->capHoc)
                    ->first();

                if (!$phanThuong) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Không có phần thưởng nào phù hợp với thành tích học tập và cấp học đấy',
                    ], 404);
                }

                $duocNhanThuong = DuocNhanThuong::create([
                    'idSuKien' => $idSuKien,
                    'idNhanKhau' => $request->idNhanKhau,
                    'tenTruong' => $request->tenTruong,
                    'tenLop' => $request->tenLop,
                    'thanhTichHocTap' => $request->thanhTichHocTap,
                    'capHoc' => $request->capHoc,
                    'anhGiayKhen' => $request->anhGiayKhen,
                    'idPhanThuong' => $phanThuong->id,
                ]);
            } else if ($suKien->type == 0) {
                $phanThuong = PhanThuong::where('idSuKien', $idSuKien)
                    ->first();

                $duocNhanThuong = DuocNhanThuong::create([
                    'idSuKien' => $idSuKien,
                    'idNhanKhau' => $request->idNhanKhau,
                    'idPhanThuong' => $phanThuong,
                ]);
            }

            return response()->json([
                'data' => $duocNhanThuong,
                'success' => true,
                'message' => 'Thêm một bé vào danh sách nhận thưởng thành công',
            ]);

        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $idDuocNhanThuong)
    {
        //chi cho update danh sach su kien loai lien quan den hoc tap
        $rules = [
            'tenTruong' => 'string',
            'tenLop' => 'string',
            'anhGiayKhen' => 'string',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 400);
        }

        try {
            $duocNhanThuong = DuocNhanThuong::find($idDuocNhanThuong);

            if (!$duocNhanThuong) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy danh sách nhận thưởng',
                ], 404);
            }

            $suKien = SuKien::find($duocNhanThuong->idSuKien);

            if ($suKien->type == 1) {

                $phanThuong = $suKien->phanThuongs()
                    ->where('thanhTichHocTap', $request->thanhTichHocTap)
                    ->where('capHoc', $request->capHoc)
                    ->first();

                if (!$phanThuong) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Không có phần thưởng nào phù hợp với thành tích học tập và cấp học đấy',
                    ], 404);
                }

                $duocNhanThuong->tenTruong = $request->tenTruong;
                $duocNhanThuong->tenLop = $request->tenLop;
                $duocNhanThuong->capHoc = $request->capHoc;
                $duocNhanThuong->thanhTichHocTap = $request->thanhTichHocTap;
                $duocNhanThuong->anhGiayKhen = $request->anhGiayKhen;
                $duocNhanThuong->idPhanThuong = $phanThuong->id;
                $duocNhanThuong->save();
            } else if ($suKien->type == 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot edit due to SuKien type'
                ], 400);
            }

            return response()->json([
                'data' => $duocNhanThuong,
                'success' => true,
                'message' => "Cập nhật danh sách nhận thưởng thành công"
            ], 200);

        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public function check($idDuocNhanThuong)
    {
        try {
            $duocNhanThuong = DuocNhanThuong::find($idDuocNhanThuong);

            if (!$duocNhanThuong) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy danh sách nhận thưởng',
                ], 404);
            }

            $duocNhanThuong->hasRewarded = true;
            $duocNhanThuong->save();

            return response()->json([
                'data' => $duocNhanThuong,
                'success' => true,
                'message' => 'Đã đánh dấu đã nhận thưởng thành công',
            ], 200);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public function uncheck($idDuocNhanThuong)
    {
        try {
            $duocNhanThuong = DuocNhanThuong::find($idDuocNhanThuong);

            if (!$duocNhanThuong) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy danh sách nhận thưởng',
                ], 404);
            }

            $duocNhanThuong->hasRewarded = false;
            $duocNhanThuong->save();

            return response()->json([
                'data' => $duocNhanThuong,
                'success' => true,
                'message' => 'Đã bỏ đánh đấu đã nhận thưởng thành công',
            ], 200);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public function destroy($idDuocNhanThuong)
    {
        try {
            $duocNhanThuong = DuocNhanThuong::find($idDuocNhanThuong);

            if (!$duocNhanThuong) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy danh sách nhận thưởng',
                ], 404);
            }

            $duocNhanThuong->delete();

            return response()->json([
                'success' => true,
                'message' => 'Đã xóa khỏi danh sách nhận thưởng thành công',
            ], 200);

        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }
}