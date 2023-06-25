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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c7948eb... feat(api): finish gift management apis
        try {
            $duocNhanThuongs = DuocNhanThuong::all();

            return response()->json([
                'data' => $duocNhanThuongs,
                'success' => true,
                'message' => 'Get all DuocNhanThuong successfully',
            ], 200);
<<<<<<< HEAD
        } catch (Exception $exception) {
=======
        } catch(Exception $exception)
        {
>>>>>>> c7948eb... feat(api): finish gift management apis
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
<<<<<<< HEAD
=======
>>>>>>> 2967e28... gift front end
=======
>>>>>>> c7948eb... feat(api): finish gift management apis
    }

    public function show($idDuocNhanThuong)
    {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c7948eb... feat(api): finish gift management apis
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
<<<<<<< HEAD
=======
>>>>>>> 2967e28... gift front end
=======
>>>>>>> c7948eb... feat(api): finish gift management apis
    }

    public function store($idSuKien, Request $request)
    {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c7948eb... feat(api): finish gift management apis
        $rules = [
            'idNhanKhau' => 'required|numeric',
            'tenTruong' => 'string',
            'tenLop' => 'string',
            'anhGiayKhen' => 'string',
        ];

        $validator = Validator::make($request->all(), $rules);

<<<<<<< HEAD
        if ($validator->fails()) {
=======
        if ($validator->fails())
        {
>>>>>>> c7948eb... feat(api): finish gift management apis
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

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7489f7c... feat(api): finish api for gift screens
            $suKien = SuKien::find($idSuKien);
            if (!$suKien) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy sự kiện'
                ], 404);
            }

<<<<<<< HEAD
=======
>>>>>>> c7948eb... feat(api): finish gift management apis
=======
>>>>>>> 7489f7c... feat(api): finish api for gift screens
            $beAlreadyIn = DuocNhanThuong::where('idSuKien', $idSuKien)
                ->where('idNhanKhau', $request->idNhanKhau)
                ->first();

            if ($beAlreadyIn) {
                return response()->json([
                    'success' => false,
                    'message' => 'Đã có nhân khẩu này trong danh sách được nhận quà',
<<<<<<< HEAD
<<<<<<< HEAD
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
                    'idPhanThuong' => $phanThuong->id,
                ]);
            }

=======
                ], 404);
=======
                ], 403);
>>>>>>> 7489f7c... feat(api): finish api for gift screens
            }
            
            $duocNhanThuong = null;
            if ($suKien->type == 1)
            {
                $phanThuong = PhanThuong::where('idSuKien', $idSuKien)
                ->where('thanhTichHocTap', $request->thanhTichHocTap)
                ->where('capHoc', $request->capHoc)
                ->first();

                if (!$phanThuong)
                {
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
            } else if ($suKien->type == 0)
            {
                $phanThuong = PhanThuong::where('idSuKien', $idSuKien)
                    ->first();

                $duocNhanThuong = DuocNhanThuong::create([
                    'idSuKien' => $idSuKien,
                    'idNhanKhau' => $request->idNhanKhau,
                    'idPhanThuong' => $phanThuong,
                ]);
            }

<<<<<<< HEAD
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

>>>>>>> c7948eb... feat(api): finish gift management apis
=======
>>>>>>> 7489f7c... feat(api): finish api for gift screens
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
<<<<<<< HEAD
=======
>>>>>>> 2967e28... gift front end
=======
>>>>>>> c7948eb... feat(api): finish gift management apis
    }

    public function update(Request $request, $idDuocNhanThuong)
    {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c7948eb... feat(api): finish gift management apis
=======
        //chi cho update danh sach su kien loai lien quan den hoc tap
>>>>>>> d801227... feat(api): add apis to check/uncheck duocnhanthuong or update it
        $rules = [
            'tenTruong' => 'string',
            'tenLop' => 'string',
            'anhGiayKhen' => 'string',
        ];

        $validator = Validator::make($request->all(), $rules);

<<<<<<< HEAD
        if ($validator->fails()) {
=======
        if ($validator->fails())
        {
>>>>>>> c7948eb... feat(api): finish gift management apis
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 400);
        }

        try {
            $duocNhanThuong = DuocNhanThuong::find($idDuocNhanThuong);
<<<<<<< HEAD

=======
            
>>>>>>> c7948eb... feat(api): finish gift management apis
            if (!$duocNhanThuong) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy danh sách nhận thưởng',
                ], 404);
            }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7489f7c... feat(api): finish api for gift screens
            $suKien = SuKien::find($duocNhanThuong->idSuKien);

            if ($suKien->type == 1) {

                $phanThuong = $suKien->phanThuongs()
<<<<<<< HEAD
                    ->where('thanhTichHocTap', $request->thanhTichHocTap)
                    ->where('capHoc', $request->capHoc)
                    ->first();

                if (!$phanThuong) {
=======
                ->where('thanhTichHocTap', $request->thanhTichHocTap)
                ->where('capHoc', $request->capHoc)
                ->first();

                if (!$phanThuong)
                {
>>>>>>> 7489f7c... feat(api): finish api for gift screens
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
<<<<<<< HEAD
            } else if ($suKien->type == 0) {
=======
            } else if ($suKien->type == 0)
            {
<<<<<<< HEAD
>>>>>>> 7489f7c... feat(api): finish api for gift screens
                // khong co gi de chinh sua
=======
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot edit due to SuKien type'
                ], 400);
>>>>>>> d801227... feat(api): add apis to check/uncheck duocnhanthuong or update it
            }

            return response()->json([
                'data' => $duocNhanThuong,
                'success' => true,
                'message' => "Cập nhật danh sách nhận thưởng thành công"
            ], 200);
<<<<<<< HEAD
=======
            $duocNhanThuong->tenTruong = $request->tenTruong;
            $duocNhanThuong->tenLop = $request->tenLop;
            $duocNhanThuong->capHoc = $request->capHoc;
            $duocNhanThuong->thanhTichHocTap = $request->thanhTichHocTap;
            $duocNhanThuong->anhGiayKhen = $request->anhGiayKhen;
            $duocNhanThuong->save();
>>>>>>> c7948eb... feat(api): finish gift management apis
=======
>>>>>>> 7489f7c... feat(api): finish api for gift screens

        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
<<<<<<< HEAD
=======
>>>>>>> 2967e28... gift front end
=======
>>>>>>> c7948eb... feat(api): finish gift management apis
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
        } catch (Exception $exception)
        {
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
        } catch (Exception $exception)
        {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public function destroy($idDuocNhanThuong)
    {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c7948eb... feat(api): finish gift management apis
        try {
            $duocNhanThuong = DuocNhanThuong::find($idDuocNhanThuong);

            if (!$duocNhanThuong) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy danh sách nhận thưởng',
                ], 404);
            }

            $duocNhanThuong->delete();
<<<<<<< HEAD

            return response()->json([
                'success' => true,
                'message' => 'Deleted Ho Khau successfully',
            ], 200);

        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
=======

>>>>>>> 2967e28... gift front end
=======

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
>>>>>>> c7948eb... feat(api): finish gift management apis
    }
}