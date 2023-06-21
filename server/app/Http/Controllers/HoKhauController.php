<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\HoKhau;
use App\Models\NhanKhau;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HoKhauController extends Controller
{
    public function index(Request $request)
    {
        try {
            $limit = $request->has('limit') ? $request->input('limit') : 10;
            $hoKhaus = HoKhau::with('nhanKhaus')
                ->where('maHoKhau', 'like', $request->maHoKhau.'%')
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

        if ($validator->fails()){
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
                return response()->json([
                    'data' => $hoKhau,
                    'success' => true,
                    'message' => 'Created Ho Khau successfully',
                ], 201);
            }

            return response()->json([
                'success' => false,
                'message' => 'Bad request',
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
        $rules = [
            'maHoKhau' => 'string|required',
            'idChuHo' => 'numeric|required',
            'maKhuVuc' => 'string|required',
            'diaChi' => 'string|required',
            'ngayLap' => 'date',
        ];
        try {
            $oldHoKhau = HoKhau::with('nhanKhaus')
                ->find($idHoKhau);
            
            $nhanKhaus = $oldHoKhau->nhanKhaus();

            $nhanKhauMois = collect($request->get('nhanKhauMois'))->map(
                function ($nhanKhauMoi) {
                    return NhanKhau::find($nhanKhauMoi['id']);
                }
            );

            if($nhanKhauMois->every(
                function (NhanKhau $nhanKhauMoi) use($idHoKhau) {
                    return $nhanKhauMoi->thanhVienHo->hoKhau->id == $idHoKhau;
                }
            )) {

                $newHoKhau = HoKhau::create([
                    'maHoKhau' => $request->maHoKhau,
                    'idChuHo' => $request->idChuHo,
                    'maKhuVuc' => $request->maKhuVuc,
                    'diaChi' => $request->diaChi,
                    'ngayLap' => $request->ngayLap,
                    'ngayChuyenDi' => $request->ngayChuyenDi,
                    'lyDoChuyen' => $request->lyDoChuyen,
                ]);

                return response()->json([
                    'data' => $nhanKhauMois,
                    'success' => true,
                    'message' => 'Tach ho khau thanh cong',
                ], 201);
            }
                
            return response()->json([
                'data' => $nhanKhauMois,
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
}
