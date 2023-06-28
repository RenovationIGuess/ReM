<?php

namespace App\Http\Controllers;

use App\Models\DinhChinh;
use Exception;
use App\Models\HoKhau;
use App\Models\NhanKhau;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class HoKhauController extends Controller
{
    public function index(Request $request)
    {
        try {
            $limit = $request->has('limit') ? $request->input('limit') : 10;
            $hoKhaus = HoKhau::with('nhanKhaus')
                ->where('maHoKhau', 'like', $request->maHoKhau . '%')
                ->orderBy('id', 'ASC')
                ->paginate($limit);

            if ($hoKhaus) {
                return response()->json([
                    'data' => $hoKhaus,
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
            ], 400);
        }
    }

    public function show($idHoKhau)
    {
        try {
            $hoKhau = HoKhau::with('nhanKhaus')
                ->find($idHoKhau);
            if ($hoKhau) {
                return response()->json([
                    'data' => $hoKhau,
                    'success' => true,
                    'message' => 'success',
                ], 200);
            }

            return response()->json([
                'success' => false,
                'message' => 'Ho Khau not found',
            ], 404);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 400);
        }
    }

    public function store(Request $request)
    {
        $rules = [
            'maHoKhau' => 'required|string',
            'idChuHo' => 'required|numeric',
            'maKhuVuc' => 'string',
            'diaChi' => 'required|string',
            // 'ngayLap' => 'required|date',
            'ngayChuyenDi' => 'date',
            'lyDoChuyen' => 'string',
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

        if (!$request->nhanKhaus) {
            return response()->json([
                'success' => false,
                'message' => 'Thiếu thông tin nhân khẩu!',
            ], 400);
        }

        try {
            // Tao ho khau moi
            $hoKhau = HoKhau::create([
                'maHoKhau' => $request->maHoKhau,
                'idChuHo' => $request->idChuHo,
                'maKhuVuc' => $request->maKhuVuc,
                'diaChi' => $request->diaChi,
                'ngayLap' => Carbon::now()->toDateTimeString(),
                'ngayChuyenDi' => $request->ngayChuyenDi,
                'lyDoChuyen' => $request->lyDoChuyen,
            ]);

            if ($hoKhau) {
                // Tim cac nhan khau
                $nhanKhaus = collect($request->get('nhanKhaus'))->map(
                    function ($nhanKhau) {
                        return NhanKhau::find($nhanKhau['id']);
                    }
                );

                // Lay ra cac quan he chu ho
                $quanHeVoiChuHos = [];
                foreach ($request->nhanKhaus as $payload) {
                    $quanHeVoiChuHos[$payload['id']] = $payload['quanHeVoiChuHo'];
                }

                // Kiem tra cac nhan khau co thuoc ho khau nao khong -> neu khong thi cho phep vao
                // ho khau dang tao
                // if (
                //     $nhanKhaus->every(
                //         function (NhanKhau $nhanKhau) {
                //             return $nhanKhau->thanhVienHo->idHoKhau == null;
                //         }
                //     )
                // ) {
                // Gan id ho khau moi cho nhan khau duoc chon
                $nhanKhaus->each(
                    function (NhanKhau $nhanKhau) use ($hoKhau, $quanHeVoiChuHos) {
                        $nhanKhau->thanhVienHo()->update([
                            "idHoKhau" => $hoKhau->id,
                            "quanHeVoiChuHo" => $quanHeVoiChuHos[$nhanKhau->id],
                        ]);
                    }
                );

                return response()->json([
                    'data' => $hoKhau,
                    'success' => true,
                    'message' => 'Tạo hộ khẩu mới thành công!',
                ], 201);
                // } else {
                //     return response()->json([
                //         'success' => false,
                //         'message' => 'Nhân khẩu đã chọn không hợp lệ!',
                //     ], 400);
                // }
            }

            return response()->json([
                'success' => false,
                'message' => 'Bad Request',
            ], 400);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 400);
        }
    }

    public function update(Request $request, $idHoKhau)
    {
        try {
            $data = request()->validate([
                'maHoKhau' => 'string',
                'idChuHo' => 'numeric',
                'maKhuVuc' => 'string',
                'diaChi' => 'string',
                'ngayLap' => 'date',
                'ngayChuyenDi' => 'date',
                'lyDoChuyen' => 'string',
            ]);

            // Lay ra ho khau
            $hoKhau = DB::table('ho_khau')->find($idHoKhau);

            // Lay ra mang cac gia tri hien tai
            $originalData = [
                'maHoKhau' => $hoKhau->maHoKhau,
                'idChuHo' => $hoKhau->idChuHo,
                'maKhuVuc' => $hoKhau->maKhuVuc,
                'diaChi' => $hoKhau->diaChi,
                'ngayLap' => $hoKhau->ngayLap,
                'ngayChuyenDi' => $hoKhau->ngayChuyenDi,
                'lyDoChuyen' => $hoKhau->lyDoChuyen,
            ];

            // Lay ra cac gia tri da thay doi
            $changes = array_diff($data, $originalData);

            // Gia tri thay doi tu
            $originalValue = '';
            // Gia tri thay doi thanh
            $changeValue = '';
            // Thong tin thay doi
            $changedFields = '';

            foreach ($changes as $key => $value) {
                $changedFields = $changedFields . $key . ',';
                $originalValue = $originalValue . ',' . $key . ': ' . $originalData[$key];
                $changeValue = $changeValue . ',' . $key . ': ' . $value;
            }
            // Luc xu li o front end chi can split(",") la duoc

            // Tao record moi cho dinh chinh
            if ($request->user_id) {
                DinhChinh::create([
                    'idHoKhau' => $idHoKhau,
                    'thongTinThayDoi' => substr_replace($changedFields, "", -1),
                    'thayDoiTu' => $originalValue,
                    'thayDoiThanh' => $changeValue,
                    'ngayThayDoi' => Carbon::now()->toDateTimeString(),
                    'idNguoiThayDoi' => $request->user_id,
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'User Authorized!',
                ], 401);
            }

            $hoKhau->update($data);

            return response()->json([
                'data' => $hoKhau,
                'success' => true,
                'message' => 'Thay đổi thành công!',
            ], 200);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 400);
        }
    }

    public function destroy($idHoKhau)
    {
        try {
            $hoKhau = HoKhau::find($idHoKhau);

            if ($hoKhau) {
                $hoKhau->delete();

                return response()->json([
                    'success' => true,
                    'message' => 'Deleted Ho Khau successfully',
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'Ho Khau not found',
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }

    public function tachHoKhau($idHoKhau, Request $request)
    {
        // Data tu request:
        $data = request()->validate([
            'maHoKhau' => 'string|required',
            'idChuHo' => 'numeric|required',
            'maKhuVuc' => 'string',
            'diaChi' => 'string|required',
            'ngayLap' => 'date',
            'ngayChuyenDi' => 'date',
            'lyDoChuyen' => 'string|required',
        ]);

        try {
            // Lay ho khau cu
            $hoKhauCu = HoKhau::find($idHoKhau);
            // Lay danh sach nhan khau truoc thay doi 
            $nhanKhauCu = $hoKhauCu->nhanKhaus;

            if ($hoKhauCu) {
                // Tim cac nhan khau moi
                $nhanKhauMois = collect($request->get('nhanKhauMois'))->map(
                    function ($nhanKhauMoi) {
                        return NhanKhau::find($nhanKhauMoi);
                    }
                );

                // Kiem tra cac nhan khau moi day co trong ho khau muon tach ko -> validate
                if (
                    $nhanKhauMois->every(
                        function (NhanKhau $nhanKhauMoi) use ($idHoKhau) {
                            return $nhanKhauMoi->thanhVienHo->idHoKhau == $idHoKhau;
                        }
                    )
                ) {
                    // Neu input chuan -> Tao ho khau moi dua tren input
                    $hoKhauMoi = HoKhau::create($data);

                    // Gia tri thay doi tu
                    $changeFrom = '';
                    // Gia tri thay doi thanh
                    $changeTo = '';

                    // Setup gia tri thay doi tu
                    foreach ($nhanKhauCu as $nhanKhau) {
                        $changeFrom = $changeFrom . $nhanKhau->hoTen . ',';
                    }

                    // Gan id ho khau moi cho nhan khau duoc chon
                    $nhanKhauMois->each(
                        function (NhanKhau $nhanKhauMoi) use ($hoKhauMoi, $changeTo) {
                            $changeTo = $changeTo . $nhanKhauMoi->hoTen . ',';
                            $nhanKhauMoi->thanhVienHo()->update(["idHoKhau" => $hoKhauMoi->id]);
                        }
                    );

                    // Tao record moi cho dinh chinh
                    if ($request->user_id) {
                        DinhChinh::create([
                            'idHoKhau' => $idHoKhau,
                            'thongTinThayDoi' => "Tách hộ khẩu",
                            'thayDoiTu' => substr_replace($changeFrom, "", -1),
                            'thayDoiThanh' => substr_replace($changeTo, "", -1),
                            'ngayThayDoi' => Carbon::now()->toDateTimeString(),
                            'idNguoiThayDoi' => $request->user_id,
                        ]);
                    } else {
                        return response()->json([
                            'success' => false,
                            'message' => 'User Authorized!',
                        ], 401);
                    }

                    return response()->json([
                        'data' => $hoKhauMoi,
                        'success' => true,
                        'message' => 'Tách hộ khẩu thành công!',
                    ], 201);
                } else
                    return response()->json([
                        'success' => false,
                        'message' => 'Mã nhân khẩu không hợp lệ!',
                    ], 400);
            }

            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy Hộ khẩu!',
            ], 404);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 400);
        }
    }

    public function xemLichSu($idHoKhau, Request $request)
    {
        try {
            $limit = $request->has('limit') ? $request->input('limit') : 10;
            $dinhChinhs = DinhChinh::with('hoKhau', 'nguoiThayDoi')
                ->where('idHoKhau', '=', $idHoKhau)
                ->orderBy('created_at', 'DESC')
                ->paginate($limit);

            if ($dinhChinhs) {
                return response()->json([
                    'data' => $dinhChinhs,
                    'success' => true,
                    'message' => 'success',
                ], 200);
            }

            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu!',
            ], 400);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 400);
        }
    }


    public function searchHouseholdLead(Request $request)
    {
        $tenChuHo = $request->hoTen;

        $hoKhau = HoKhau::whereHas('isChuHo', function ($query) use ($tenChuHo) {
            $query->where('hoTen', 'like', '%' . $tenChuHo . '%');
        })->get();

        if ($hoKhau) {
            return response()->json([
                'data' => $hoKhau,
                'success' => true,
                'message' => 'success',
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'No data',
        ], 404);
    }
}
