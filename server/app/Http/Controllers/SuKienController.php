<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\SuKien;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class SuKienController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $limit = $request->has('limit') ? $request->input('limit') : 10;
            $suKiens = SuKien::with('duocNhanThuongs')
                ->where('name', 'like', '%'.$request->name.'%')
                ->orderBy('id', 'ASC')
                ->paginate($limit);

            foreach ($suKiens as $suKien)
            {
                foreach($suKien->duocNhanThuongs as $duocNhanThuong)
                {
                    $duocNhanThuong->nhanKhau;
                    $duocNhanThuong->phanQuas;
                }
            }

            if ($suKiens) {
                return response()->json([
                    'data' => $suKiens,
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

    public function show($idSuKien)
    {
        try {
            $suKien = SuKien::with('duocNhanThuongs')
                ->find($idSuKien);
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
        
    }

    public function update(Request $request, $idSuKien)
    {
        
    }

    public function destroy($idSuKien)
    {
        
    }
}
