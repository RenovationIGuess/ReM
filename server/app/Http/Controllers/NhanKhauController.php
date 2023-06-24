<?php

namespace App\Http\Controllers;

use App\Models\HoKhau;
use App\Models\NhanKhau;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\JsonResponse;

class NhanKhauController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $limit = $request->has('limit') ? $request->input('limit') : 10;
            $nhanKhaus = NhanKhau::with('duocKhaiTu', 'chungMinhThu')
                ->where('hoTen', 'like', '%' . $request->hoTen . '%')
                ->where('maNhanKhau', 'like', $request->maNhanKhau . '%')
                ->orderBy('id', 'ASC')
                ->paginate($limit);

            if ($nhanKhaus) {
                return response()->json([
                    'data' => $nhanKhaus,
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
            ], 500);
        }
    }

    public function show($idNhanKhau): JsonResponse
    {
        try {
            $nhanKhau = NhanKhau::with('duocKhaiTu', 'chungMinhThu')
                ->find($idNhanKhau);
            if ($nhanKhau) {
                return response()->json([
                    'data' => $nhanKhau,
                    'success' => true,
                    'message' => 'success',
                ], 200);
            }

            return response()->json([
                'sucess' => false,
                'message' => 'Nhan Khau not found',
            ], 404);

        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $moiSinh = $request->query('moiSinh');

        $nhanKhauData = request('nhanKhau')->validate([
            'maNhanKhau' => 'required|string',
            'hoTen' => 'required|string',
            'biDanh' => 'string',
            'gioiTinh' => 'required|string',
            'noiSinh' => 'required|string',
            'ngaySinh' => 'required|before_or_equal:today',
            'nguyenQuan' => 'required|string',
            'diaChiThuongTru' => 'required|string',
            'diaChiHienTai' => 'required|string',
            'danToc' => 'string',
            'quocTich' => 'string',
            'tonGiao' => 'string',
            'soHoChieu' => 'string',
            'trinhDoHocVan' => 'string',
            'ngheNghiep' => 'string',
            'noiLamViec' => 'string',
            //khong can du cac truong
            //'tienAn' => 'string',
            'ghiChu' => 'string',
        ]);

        $cmtData = request('chungMinhThu')->validate([
            'soCMT' => "required|string",
            'ngayCap' => "required|date",
            'noiCap' => "required|string",
        ]);

        // $validator = Validator::make($request->all(), $rules);

        // if ($validator->fails())
        // {
        //     return response()->json(
        //         [
        //             'data' => $validator->errors(),
        //             'success' => false,
        //             'message' => 'Validation Error',
        //         ],
        //         400
        //     );
        // }

        try {
            // Lay ra ho khau duoc chon
            $hoKhau = HoKhau::with('nhanKhaus')->find($request->idHoKhau);

            // Kiem tra xem co ho khau da tim co ton tai k?
            if ($hoKhau) {
                // Neu moi sinh thi sua info
                if ($moiSinh == 1) {
                    $data['ghiChu'] = 'Mới sinh';
                    $data['noiLamViec'] = null;
                    $data['trinhDoHocVan'] = null;
                    $data['ngheNghiep'] = null;
                }

                // Tao nhan khau
                $nhanKhau = NhanKhau::create($data);

                // Tao moi quan he vs ho khau
                $nhanKhau->thanhVienHo()->create([
                    'idNhanKhau' => $nhanKhau->id,
                    'idHoKhau' => $hoKhau->id,
                    'quanHeVoiChuHo' => "",
                ]);

                // request('nhanKhau')
                // $request['nhanKhau'] 
                // {
                //     nhanKhau: {
                //     'ghiChu': 'fsdafadsf',

                //     },
                //     cmt: {

                //     }
                // }

                // Tao chung minh thu
                $nhanKhau->chungMinhThu()->create([

                ]);

                return response()->json([
                    'data' => $nhanKhau,
                    'success' => true,
                    'message' => 'Tạo nhân khẩu thành công!',
                ], 200);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => "ID hộ khẩu không hợp lệ!",
                ]);
            }
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $idNhanKhau)
    {
        $rules = [
            'maNhanKhau' => 'required|string',
            'hoTen' => 'required|string',
            'biDanh' => 'string',
            'gioiTinh' => 'required|string',
            'noiSinh' => 'required|string',
            'ngaySinh' => 'required|before_or_equal:today',
            'nguyenQuan' => 'required|string',
            'diaChiThuongTru' => 'required|string',
            'diaChiHienTai' => 'required|string',
            'danToc' => 'string',
            'quocTich' => 'string',
            'tonGiao' => 'string',
            'soHoChieu' => 'string',
            'trinhDoHocVan' => 'string',
            'ngheNghiep' => 'string',
            'noiLamViec' => 'string',
            //khong can du cac truong
            //'tienAn' => 'string',
            'ghiChu' => 'string',
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
            $nhanKhau = NhanKhau::find($idNhanKhau);
        
            if (!$nhanKhau) {
                return response()->json([
                    'success' => false,
                    'message' => 'Nhan Khau not found',
                ], 404);
            }

            $nhanKhau->maNhanKhau = $request->maNhanKhau;
            $nhanKhau->hoTen = $request->hoTen;
            $nhanKhau->biDanh = $request->biDanh;
            $nhanKhau->gioiTinh = $request->gioiTinh;
            $nhanKhau->ngaySinh = $request->ngaySinh;
            $nhanKhau->nguyenQuan = $request->nguyenQuan;
            $nhanKhau->diaChiThuongTru = $request->diaChiThuongTru;
            $nhanKhau->diaChiHienTai = $request->diaChiHienTai;
            $nhanKhau->danToc = $request->danToc;
            $nhanKhau->quocTich = $request->quocTich;
            $nhanKhau->tonGiao = $request->tonGiao;
            $nhanKhau->soHoChieu = $request->soHoChieu;
            $nhanKhau->trinhDoHocVan = $request->trinhDoHocVan;
            $nhanKhau->ngheNghiep = $request->ngheNghiep;
            $nhanKhau->noiLamViec = $request->noiLamViec;
            $nhanKhau->tienAn = $request->tienAn;
            $nhanKhau->ghiChu = $request->ghiChu;
            $nhanKhau->save();

            return response()->json([
                'data' => $nhanKhau,
                'success' => true,
                'message' => 'Updated Nhan Khau successfully',
            ], 200);

        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public function destroy($idNhanKhau)
    {
        try {
            $nhanKhau = NhanKhau::find($idNhanKhau);
            if (!$nhanKhau) {
                return response()->json([
                    'success' => false,
                    'message' => 'Nhan Khau not found',
                ], 404);
            }

            $nhanKhau->delete();

            return response()->json([
                'success' => true,
                'message' => 'Deleted Nhan Khau successfully',
            ], 200);

        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public static function getInAgeRange($start, $end)
    {
        $nhanKhaus = NhanKhau::all()->filter(function (NhanKhau $value, int $key) use ($start, $end) {
            return $value->age <= $end && $value->age >= $start;
        });

        return $nhanKhaus;
    }
}