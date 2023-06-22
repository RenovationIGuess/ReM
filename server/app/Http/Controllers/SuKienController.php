<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\SuKien;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\JsonResponse;

class SuKienController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $limit = $request->has('limit') ? $request->input('limit') : 10;
            $suKiens = SuKien::where('name', 'like', '%'.$request->name.'%')
                ->orderBy('id', 'ASC')
                ->paginate($limit);

            if ($suKiens) {
                return response()->json([
                    'data' => $suKiens,
                    'success' => true,
                    'message' => 'Get all Su Kien(s) successfully',
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

    public function show($idSuKien)
    {
        try {
            $suKien = SuKien::with('duocNhanThuongs')
                ->find($idSuKien);

            foreach($suKien->duocNhanThuongs() as $duocNhanThuong)
            {
                $duocNhanThuong->nhanKhau;
                $duocNhanThuong->phanQuas;
            }

            if ($suKien) {
                return response()->json([
                    'data' => $suKien,
                    'success' => true,
                    'message' => 'success',
                ], 200);
            }

            return response()->json([
                'success' => false,
                'message' => 'Su Kien not found',
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
            'name' => 'string|required',
            'ngayBatDau' => 'date|required|after:yesterday',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails())
        {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 400);
        }

        try {
            $suKien = SuKien::create([
                'name' => $request->name,
                'ngayBatDau' => $request->ngayBatDau,
            ]);

            return response()->json([
                'data' => $suKien,
                'success' => true,
                'message' => 'Created Su Kien successfully',
            ], 200);
        }
        catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }

    public function update(Request $request, $idSuKien)
    {
        
    }

    public function destroy($idSuKien)
    {
        
    }
}
