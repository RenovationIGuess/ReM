<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\PhanQua;
use Illuminate\Http\Request;
use Validator;

class PhanQuaController extends Controller
{
    public function index(Request $request)
    {
        try {
            $limit = $request->has('limit') ? $request->input() : 10;

            $phanQuas = PhanQua::where('name', 'like', '%'.$request->name.'%')
                ->orderBy('id', 'ASC')
                ->paginate($limit);

            if ($phanQuas) {
                return response()->json([
                    'data' => $phanQuas,
                    'success' => true,
                    'message' => 'Get PhanQuas successfully',
                ], 200);
            }

            return response()->json([
                'success' => false,
                'message' => 'No data',
            ], 404);
        
        } 
        catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }

    public function show($idPhanQua)
    {
        try {
            $phanQua = PhanQua::find($idPhanQua);

            if ($phanQua) {
                return response()->json([
                    'data' => $phanQua,
                    'success' => true,
                    'message' => 'success',
                ], 200);
            }
            
            return response()->json([
                'success' => false,
                'message' => 'Phan Qua not found',
            ], 404);
        }
        catch (Exception $exception) {
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
            'unit_price' => 'numeric|required',
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
            $phanQua = PhanQua::create([
                'name' => $request->name,
                'unit_price' => $request->unit_price,
            ]);

            return response()->json([
                'data' => $phanQua,
                'success' => false,
                'message' => 'Created Phan Qua successfully',
            ], 200);
        }
        catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }

    public function update(Request $request, $idPhanQua)
    {
        
    }

    public function destroy($idPhanQua)
    {
        try {
            $phanQua = PhanQua::find($idPhanQua);
            if (!$phanQua) {
                return response()->json([
                    'success' => false,
                    'message' => 'Phan Qua not found',
                ], 404);
            }

            $phanQua->delete();

            return response()->json([
                'success' => true,
                'message' => 'Deleted Phan Qua successfully',
            ]);
        }
        catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }
}
