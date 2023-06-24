<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ItemController extends Controller
{
    public function index(Request $request)
    {
        try {
            $limit = $request->has('limit') ? $request->input() : 10;

            $items = Item::where('name', 'like', '%' . $request->name . '%')
                ->orderBy('id', 'ASC')
                ->paginate($limit);

            if ($items) {
                return response()->json([
                    'data' => $items,
                    'success' => true,
                    'message' => 'Get Items successfully',
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

    public function show($idItem)
    {
        try {
            $item = Item::find($idItem);

            if ($item) {
                return response()->json([
                    'data' => $item,
                    'success' => true,
                    'message' => 'success',
                ], 200);
            }
            return response()->json([
                'success' => false,
                'message' => 'Item not found',
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
        $rules = [
            'name' => 'string|required',
            'unit_price' => 'numeric|required',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 400);
        }

        try {
            $item = Item::create([
                'name' => $request->name,
                'unit_price' => $request->unit_price,
            ]);

            return response()->json([
                'data' => $item,
                'success' => true,
                'message' => 'Created Item successfully',
            ], 200);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $idItem)
    {
        $rules = [
            'name' => 'required|string',
            'unit_price' => 'required|numeric',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails())
        {
            return response()->json(
                [
                    'success' => false,
                    'message' => $validator->errors(),
                ],
                400
            );
        }

        try {
            $item = Item::find($idItem);
            if (!$item) {
                return response()->json([
                    'success' => false,
                    'message' => 'Item not found',
                ], 404);
            }

            $item->name = $request->name;
            $item->unit_price = $request->unit_price;
            $item->save();

            return response()->json([
                'data' => $item,
                'success' => true,
                'message' => 'Update item successfully'
            ], 200);

        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public function destroy($idItem)
    {
        try {
            $item = Item::find($idItem);
            if (!$item) {
                return response()->json([
                    'success' => false,
                    'message' => 'Item not found',
                ], 404);
            }

            $item->delete();

            return response()->json([
                'success' => true,
                'message' => 'Deleted item successfully',
            ]);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }
}