<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\TamTru;
use App\Enums\GioiTinh;
use App\Models\TamVang;
use App\Models\NhanKhau;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\NhanKhauController;

class ThongKeController extends Controller
{
    public function thongKeTheoDoTuoi()
    {

        $nhanKhaus = NhanKhau::all()->groupBy('age')->all();

        foreach ($nhanKhaus as $age => $nhanKhauArray)
        {
            $nhanKhaus[$age] = $nhanKhauArray->count();
        }

        return response()->json([
            'data' => $nhanKhaus,
            'message' => 'success',
            'success' => true,
        ]);
    }

    public function thongKeThapDanSo()
    {
        try {
            $nhanKhaus = NhanKhau::all()->groupBy(['gioiTinh','age'])->all();

            foreach ($nhanKhaus as $gioiTinh => $mergeGioiTinh)
            {
                foreach ($mergeGioiTinh as $age => $merged)
                {
                    $mergeGioiTinh[$age] = $merged->count();
                }
            }

            return response()->json([
                'data' => $nhanKhaus,
                'success' => true,
                'message' => 'success',
            ], 200);
        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
                'success' => false,
            ]);
        }
    }

    public function thongKeTheoGioiTinh()
    {
        try {
            $males = NhanKhau::where('gioiTinh', '=', GioiTinh::MALE)
                ->get();
            $females = NhanKhau::where('gioiTinh', '=', GioiTinh::FEMALE)
                ->get();

            return response()->json([
                'data' => [
                    'namGioi' => $males->count(),
                    'nuGioi' => $females->count(),
                ],
                'success' => true,
                'message' => 'success',
            ], 200);
        } catch (Exception $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
                'success' => false,
            ]);
        }
    }

    public function thongKeTheoTuoi(Request $request)
    {
        $rules = [
            'tuTuoi' => 'numeric|required',
            'denTuoi' => 'numeric|required',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 403);
        }
        try {
            $statisticsByAges = NhanKhau::all()->filter(function (NhanKhau $nhanKhau, int $key) use ($request) {
                return $nhanKhau->age >= intval($request->tuTuoi) && $nhanKhau->age <= intval($request->denTuoi);
            });

            return response()->json([
                'data' => $statisticsByAges->count(),
                'success' => true,
                'message' => 'success',
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public function thongKeKhoangThoiGian() {
        try {
            $nhanKhaus = NhanKhau::all();

            $nhanKhaus->map(function (NhanKhau $nhanKhau) {
                $nhanKhau['thoiGianTao'] = Carbon::parse($nhanKhau->created_at)->age + 1;
                return $nhanKhau;
            });

            $mergedNhanKhaus = collect($nhanKhaus)->groupBy('thoiGianTao')->all();

            foreach ($mergedNhanKhaus as $year => $mergedNhanKhauArray)
            {
                $mergedNhanKhaus[$year] = $mergedNhanKhauArray->count();
            }

            return response()->json([
                'data' => $mergedNhanKhaus,
                'success' => true,
                'message' => 'success',
            ], 200);

        } catch(Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public function thongKeTamVangTamTru(Request $request)
    {
        $rules = [
            'ngayBatDau' => 'date',
            'ngayKetThuc' => 'date',
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
            $tamVangs = DB::table('tam_vang')
                ->whereDate('created_at', '>=', $request->ngayBatDau)
                ->whereDate('created_at', '<=', $request->ngayKetThuc)
                ->orderBy('id', 'ASC')
                ->get();

            $tamTrus = DB::table('tam_tru')
                ->whereDate('created_at', '>=', $request->ngayBatDau)
                ->whereDate('created_at', '<=', $request->ngayKetThuc)
                ->orderBy('id', 'ASC')
                ->get();

            return response()->json([
                'data' => ['tamVangs' => $tamVangs->count(), 'tamTrus' => $tamTrus->count()],
                'success' => true,
                'message' => 'success',
            ], 200);

        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }
}