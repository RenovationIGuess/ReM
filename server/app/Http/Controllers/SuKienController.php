<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Item;
use App\Models\HoKhau;
use App\Models\SuKien;
use App\Models\PhanThuong;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Http\Request;
use App\Enums\ThanhTichHocTap;
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
                ->orderBy('created_at', 'DESC')
                ->paginate($limit);

            if ($suKiens) {
                return response()->json([
                    'data' => $suKiens,
                    'success' => true,
                    'message' => 'Lấy danh sách tất cả sự kiện thành công',
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

    public function show($idSuKien)
    {
        try {
            $suKien = SuKien::find($idSuKien);

            if ($suKien) {
                $suKien->phanThuongs;
                $suKien->duocNhanThuongs;

                foreach ($suKien->duocNhanThuongs as $duocNhanThuong) {
                    $duocNhanThuong->nhanKhau;
                }

                return response()->json([
                    'data' => $suKien,
                    'success' => true,
                    'message' => 'Lấy thông tin về sự kiện thành công',
                ], 200);
            }

            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy sự kiện',
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
            'name' => 'string|required|unique:su_kien',
            'ngayBatDau' => 'date|required|after:yesterday',
            'type' => 'numeric|required',
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

            if ($request->type == 1) {
                $phan_thuongs = $request->phan_thuongs;
                foreach ($phan_thuongs as $phan_thuong) {
                    $phanThuong = PhanThuong::create([
                        'thanhTichHocTap' => $phan_thuong['thanhTichHocTap'],
                        'capHoc' => $phan_thuong['capHoc'],
                        'type' => 1,
                        'idSuKien' => $suKien->id,
                    ]);

                    foreach ($phan_thuong['items'] as $item) {
                        $phanThuong->items()->attach($item['idItem'], ['soLuong' => $item['soLuong']]);
                    }
                }
            } else if ($request->type == 0) {
                //Chi them 1 phan thuong
                $phan_thuongs = $request->phan_thuongs;

                if (count($phan_thuongs) != 1) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Sự kiện loại này được có 1 phần thưởng.'
                    ], 403);
                }

                foreach ($phan_thuongs as $phan_thuong) {
                    $phanThuong = PhanThuong::create([
                        'type' => 0,
                        'idSuKien' => $suKien->id,
                    ]);

                    foreach ($phan_thuong['items'] as $item) {
                        $phanThuong->items()->attach($item['idItem'], ['soLuong' => $item['soLuong']]);
                    }
                }
            }

            $suKien->phanThuongs;

            if ($request->type == 1) {
                $phan_thuongs = $request->phan_thuongs;
                foreach ($phan_thuongs as $phan_thuong) {
                    $phanThuong = PhanThuong::create([
                        'thanhTichHocTap' => $phan_thuong['thanhTichHocTap'],
                        'capHoc' => $phan_thuong['capHoc'],
                        'type' => 1,
                        'idSuKien' => $suKien->id,
                    ]);

                    foreach ($phan_thuong['items'] as $item) {
                        $phanThuong->items()->attach($item['idItem'], ['soLuong' => $item['soLuong']]);
                    }
                }
            } else if ($request->type == 0) {
                //Chi them 1 phan thuong
                $phan_thuongs = $request->phan_thuongs;

                if (count($phan_thuongs) != 1) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Sự kiện loại này chỉ được có 1 phần thưởng.'
                    ], 403);
                }

                foreach ($phan_thuongs as $phan_thuong) {
                    $phanThuong = PhanThuong::create([
                        'type' => 0,
                        'idSuKien' => $suKien->id,
                    ]);

                    foreach ($phan_thuong['items'] as $item) {
                        $phanThuong->items()->attach($item['idItem'], ['soLuong' => $item['soLuong']]);
                    }
                }
            }

            $suKien->phanThuongs;

            return response()->json([
                'data' => $suKien,
                'success' => true,
                'message' => 'Tạo sự kiện thành công',
            ], 200);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $idSuKien)
    {
        $rules = [
            'name' => 'string',
            'ngayBatDau' => 'date',
            'type' => 'numeric|required',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors(),
            ], 400);
        }

        try {
            $suKien = SuKien::find($idSuKien);

            if (!$suKien) {
                return response()->json(
                    [
                        'success' => false,
                        'message' => 'Không tìm thấy sự kiện'
                    ],
                    404
                );
            }

            if ($suKien->isDone) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không thể chỉnh sửa vì sự kiện này đã kết thúc',
                ], 403);
            }

            $suKien->name = $request->name;
            $suKien->ngayBatDau = $request->ngayBatDau;
            $suKien->type = $request->type;

            if ($request->type == 1) {
                $phan_thuongs = $request->phan_thuongs;
                foreach ($phan_thuongs as $phan_thuong) {
                    $phanThuong = PhanThuong::find($phan_thuong['id']);
                    if ($phanThuong && $phanThuong->idSuKien == $idSuKien) {
                        $phanThuong->thanhTichHocTap = $phan_thuong['thanhTichHocTap'];
                        $phanThuong->capHoc = $phan_thuong['capHoc'];
                        $phanThuong->type = 1;

                        $phanThuong->items()->detach();

                        foreach ($phan_thuong['items'] as $item) {
                            $phanThuong->items()->attach($item['pivot']['idItem'], ['soLuong' => $item['pivot']['soLuong']]);
                        }
                        $phanThuong->save();
                    }
                }
            } else if ($request->type == 0) {
                $phan_thuongs = $request->phan_thuongs;
                if (count($phan_thuongs) != 1) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Sự kiện loại này chỉ được có 1 phần thưởng.'
                    ], 403);
                }
                foreach ($phan_thuongs as $phan_thuong) {
                    $phanThuong = PhanThuong::find($phan_thuong['id']);
                    if ($phanThuong && $phanThuong->idSuKien == $idSuKien) {
                        $phanThuong->items()->detach();

                        foreach ($phan_thuong['items'] as $item) {
                            $phanThuong->items()->attach($item['pivot']['idItem'], ['soLuong' => $item['pivot']['soLuong']]);
                        }
                    }
                }
            }

            $suKien->save();

            return response()->json([
                'data' => $suKien,
                'success' => true,
                'message' => 'Cập nhật thông tin sự kiện thành công',
            ], 200);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public function destroy($idSuKien)
    {
        try {
            $suKien = SuKien::find($idSuKien);

            if (!$suKien) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy sự kiện',
                ], 404);
            }

            if ($suKien->isDone) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không thể xóa vì sự kiện này đã kết thúc',
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
                'message' => 'Xóa sự kiện thành công',
            ], 200);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public function thongKeHoKhau($idSuKien)
    {
        try {

            $hoKhaus = collect();

            $suKien = SuKien::find($idSuKien);

            if (!$suKien) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy sự kiện',
                ], 404);
            }

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

            if ($hoKhaus) {
                return response()->json([
                    'data' => $hoKhaus,
                    'success' => true,
                    'message' => 'Thống kê hộ khâu cho sự kiện này thành công',
                ], 200);
            }

            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy sự kiện',
            ], 404);

        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
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

            if (!$suKien) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy sự kiện',
                ], 404);
            }

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
                    'message' => 'Thống kê phần quà cho sự kiện này thành công',
                ], 200);
            }

            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy sự kiện',
            ], 404);

        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public function checkIsDone($idSuKien)
    {
        try {
            $suKien = SuKien::find($idSuKien);

            if (!$suKien) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy sự kiện',
                ], 404);
            }

            $suKien->isDone = true;
            $suKien->save();

            return response()->json([
                'data' => $suKien,
                'success' => true,
                'message' => 'Đánh dấu sự kiện đã cấp phát hết thành công',
            ], 200);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }

    public function uncheckIsDone($idSuKien)
    {
        try {
            $suKien = SuKien::find($idSuKien);

            if (!$suKien) {
                return response()->json([
                    'success' => false,
                    'message' => 'Không tìm thấy sự kiện',
                ], 404);
            }

            $suKien->isDone = false;
            $suKien->save();

            return response()->json([
                'data' => $suKien,
                'success' => true,
                'message' => 'Bỏ đánh dấu sự kiện đã cấp phát hết thành công',
            ], 200);
        } catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 500);
        }
    }
}