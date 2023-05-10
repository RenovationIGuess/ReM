<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Item;
use App\Models\HoKhau;
use App\Models\SuKien;
use Illuminate\Http\Request;
use App\Models\DuocNhanThuong;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\JsonResponse;

class SuKienController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $limit = $request->has('limit') ? $request->input('limit') : 10;
            $suKiens = SuKien::with('phanThuongs')
                ->where('name', 'like', '%' . $request->name . '%')
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
            $suKien = SuKien::find($idSuKien);

            $suKien->phanThuongs;
            $suKien->duocNhanThuongs;

            $suKien->phanThuongs;
            $suKien->duocNhanThuongs;

            $suKien->phanThuongs;
            $suKien->duocNhanThuongs;

            $suKien->phanThuongs;
            $suKien->duocNhanThuongs;

            if ($suKien) {
                return response()->json([
                    'data' => $suKien,
                    'success' => true,
                    'message' => 'Get informations about Su Kien successfully',
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
            'type' => ['required' | Rule::in([0, 1])],
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 400);
        }

        try {
            $suKien = SuKien::create([
                'name' => $request->name,
                'ngayBatDau' => $request->ngayBatDau,
                'type' => $request->type,
            ]);

            return response()->json([
                'data' => $suKien,
                'success' => true,
                'message' => 'Created Su Kien successfully',
            ], 200);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }

    public function update(Request $request, $idSuKien)
    {
        $rules = [
            'name' => 'string|required',
            'ngayBatDau' => 'date|required|after:yesterday',
            'type' => ['required' | Rule::in([0, 1])],
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 400);
        }

        try {
            $suKien = SuKien::create([
                'name' => $request->name,
                'ngayBatDau' => $request->ngayBatDau,
                'type' => $request->type,
            ]);

            return response()->json([
                'data' => $suKien,
                'success' => true,
                'message' => 'Created Su Kien successfully',
            ], 200);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }

    public function destroy($idSuKien)
    {
        try {
            $suKien = SuKien::find($idSuKien);

            if (!$suKien) {
                return response()->json([
                    'success' => false,
                    'message' => 'Su Kien not found',
                ], 404);
            }

            if ($suKien->isDone) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot delete this Su Kien because it is over',
                ], 403);
            }

            foreach ($suKien->phanThuongs as $phanThuong) {
                $phanThuong->delete();
            }

            foreach ($suKien->duocNhanThuongs as $duocNhanThuong) {
                $duocNhanThuong->delete();
            }

            $suKien->delete();

            return response()->json([
                'success' => true,
                'message' => 'Deleted Su Kien successfully',
            ], 200);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }

    public function thongKeHoKhau($idSuKien)
    {
        try {

            $hoKhaus = collect();

            $suKien = SuKien::find($idSuKien);

            foreach ($suKien->duocNhanThuongs as $duocNhanThuong) {
                $duocNhanThuong['idHoKhau'] = $duocNhanThuong->nhanKhau->thanhVienHo->idHoKhau;
                $duocNhanThuong->phanThuong;
            }

            $grouped = $suKien->duocNhanThuongs->groupBy('idHoKhau');

            foreach ($grouped as $idHoKhau => $duocNhanThuongs) {
                $hoKhau = HoKhau::find($idHoKhau);
                $hoKhau['duocNhanThuongs'] = $duocNhanThuongs;
                $hoKhaus->add($hoKhau);
            }

            foreach ($hoKhaus as $hoKhau) {
                $hoKhau['totalCost'] = 0;
                foreach ($hoKhau->duocNhanThuongs as $duocNhanThuong) {
                    $hoKhau['totalCost'] += $duocNhanThuong->phanThuong->cost;
                }
            }

            if ($suKien) {
                return response()->json([
                    'data' => $hoKhaus,
                    'success' => true,
                    'message' => 'Get all of items for SuKien successfully',
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

    public static function calculateTotal(SuKien $suKien, $item_id)
    {
        $totalQuantity = 0;
        $totalCost = 0;

        foreach ($suKien->phanThuongs as $phanThuong) {
            foreach ($phanThuong->items as $item) {
                if ($item->id == $item_id) {
                    $quantity = $item->pivot->soLuong * $phanThuong->count;
                    $totalQuantity += $quantity;
                    $totalCost += $quantity * $item->unit_price;
                }
            }
        }

        return [$totalQuantity, $totalCost];
    }

    public function thongKeItems($idSuKien)
    {
        try {
            $uniqueItemIds = collect();
            $suKien = SuKien::find($idSuKien);

            foreach ($suKien->phanThuongs as $phanThuong) {
                foreach ($phanThuong->items as $item) {
                    $uniqueItemIds->add($item->id);
                }
            }
            $uniqueItemIds = $uniqueItemIds->unique()->values()->all();

            $uniqueItems = Item::findMany($uniqueItemIds);

            foreach ($uniqueItems as $uniqueItem) {
                $uniqueItem['totalQuantity'] = $this->calculateTotal($suKien, $uniqueItem->id)[0];
                $uniqueItem['totalCost'] = $this->calculateTotal($suKien, $uniqueItem->id)[1];
            }

            if ($uniqueItems) {
                return response()->json([
                    'data' => $uniqueItems,
                    'success' => true,
                    'message' => 'Get all of items for SuKien successfully',
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
}