<?php

namespace App\Http\Controllers;

use App\Models\DinhChinh;
use Exception;
use App\Models\HoKhau;
use App\Models\NhanKhau;
use Carbon\Carbon;
use Illuminate\Http\Request;
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
            ]);
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
            ]);
        }
    }

    public function store(Request $request)
    {
        $rules = [
            'maHoKhau' => 'required|string',
            'idChuHo' => 'required|numeric',
            'maKhuVuc' => 'string',
            'diaChi' => 'required|string',
            'ngayLap' => 'required|date',
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

        try {
            $hoKhau = HoKhau::create([
                'maHoKhau' => $request->maHoKhau,
                'idChuHo' => $request->idChuHo,
                'maKhuVuc' => $request->maKhuVuc,
                'diaChi' => $request->diaChi,
                'ngayLap' => $request->ngayLap,
                'ngayChuyenDi' => $request->ngayChuyenDi,
                'lyDoChuyen' => $request->lyDoChuyen,
            ]);

            if ($hoKhau) {
                // Tim cac nhan khau moi
                $nhanKhaus = collect($request->get('nhanKhaus'))->map(
                    function ($nhanKhau) {
                        return NhanKhau::find($nhanKhau['id']);
                    }
                );

                // Kiem tra cac nhan khau co thuoc ho khau nao khong -> neu khong thi cho phep vao
                // ho khau dang tao
                if ($nhanKhaus->every(
                    function (NhanKhau $nhanKhau) {
                        return $nhanKhau->thanhVienHo->idHoKhau == null;
                    }
                )) {
                    foreach ($nhanKhaus as $nhanKhau) {
                        $nhanKhau->thanhVienHo()->create([
                            'idHoKhau' => $hoKhau->id,
                            'idNhanKhau' => $nhanKhau->id,
                            'quanHeVoiChuHo' => '',
                        ]);
                    }

                    return response()->json([
                        'data' => $hoKhau,
                        'success' => true,
                        'message' => 'Tạo hộ khẩu mới thành công!',
                    ], 201);
                } else {
                    return response()->json([
                        'success' => false,
                        'message' => 'Nhân khẩu đã chọn không hợp lệ!',
                    ]);
                }
            }

            return response()->json([
                'success' => false,
                'message' => 'Bad Request',
            ], 400);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }

    public function update(Request $request, $idHoKhau)
    {
        try {
            $data = request()->validate([
                'maHoKhau' => '',
                'idChuHo' => '',
                'maKhuVuc' => '',
                'diaChi' => '',
                'ngayLap' => '',
                'ngayChuyenDi' => '',
                'lyDoChuyen' => '',
            ]);

        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
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
            'maKhuVuc' => 'string|required',
            'diaChi' => 'string|required',
            'ngayLap' => 'date|required',
            'ngayChuyenDi' => 'date|required',
            'lyDoChuyenDi' => 'string|required',
        ]);

        try {
            // Tim cac nhan khau moi
            $nhanKhauMois = collect($request->get('nhanKhauMois'))->map(
                function ($nhanKhauMoi) {
                    return NhanKhau::find($nhanKhauMoi);
                }
            );

            // Kiem tra cac nhan khau moi day co trong ho khau muon tach ko -> validate
            if ($nhanKhauMois->every(
                function (NhanKhau $nhanKhauMoi) use ($idHoKhau) {
                    return $nhanKhauMoi->thanhVienHo->idHoKhau == $idHoKhau;
                }
            )) {
                // Neu input chuan -> Tao ho khau moi dua tren input
                $hoKhauMoi = HoKhau::create($data);

                // Gan id ho khau moi cho nhan khau duoc chon
                $nhanKhauMois->each(
                    function (NhanKhau $nhanKhauMoi) use ($hoKhauMoi) {
                        $nhanKhauMoi->thanhVienHo->idHoKhau = $hoKhauMoi->id;
                        $nhanKhauMoi->thanhVienHo->save();
                    }
                );

                // Them vao dinh chinh
                DinhChinh::create([
                    'idHoKhau' => $idHoKhau,
                    'thongTinThayDoi' => "Tách hộ khẩu",
                    'thayDoiTu' => '',
                    'thayDoiThanh' => '',
                    'ngayThayDoi' => Carbon::now(),
                    'idNguoiThayDoi' => auth()->user()->id,
                ]);

                return response()->json([
                    'data' => $hoKhauMoi,
                    'success' => true,
                    'message' => 'Tách hộ khẩu thành công!',
                ], 201);
            } else return response()->json([
                'success' => false,
                'message' => 'Mã nhân khẩu không hợp lệ!',
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy Hộ khẩu!',
            ], 404);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
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
                ]);
            }
            
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy dữ liệu!',
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }
}