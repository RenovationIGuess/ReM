<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\TamTru;
use App\Models\TamVang;
use App\Models\NhanKhau;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ThongKeController extends Controller
{
    public function thongKeTheoTuoi()
    {
        $divisions = [
            '0-4' => range(0,4),
            '5-9' => range(5,9),
            '10-14' => range(10,14),
            '15-19' => range(15,19),
            '20-24' => range(20,24),
            '25-29' => range(25,29),
            '30-34' => range(30,34),
            '35-39' => range(35,39),
            '40-44' => range(40,44),
            '45-49' => range(45,49),
            '50-54' => range(50,54),
            '55-59' => range(55,59),
            '60-64' => range(60,64),
            '65-69' => range(65,69),
            '70-74' => range(70,74),
            '75-79' => range(75,79),
            '80-84' => range(80,84),
            '85-89' => range(85,89),
            '90-94' => range(90,94),
            '95-99' => range(95,99),
            '100+' => range(100,200),
        ];

        foreach($divisions as $key => $value){
            $statisticsByAge[$key] = NhanKhauController::getInAgeRange($value[0], end($value))->count();
        }

        return response()->json([
            'data' => $statisticsByAge,
            'message' => 'success',
            'success' => true,
        ]);
    }

    public function thongKeTheoGioiTinh()
    {

    }

    public function thongKeTamVangTamTru(Request $request)
    {
        $rules = [
            'ngayBatDau' => 'date',
            'ngayKetThuc' => 'date',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails())
        {
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
            $tamVangs = TamVang::with('nhanKhau')
                ->whereTime('created_at', '>', $request->ngayBatDau)
                ->whereTime('created_at', '<', $request->ngayKetThuc)
                ->orderBy('id', 'ASC');

            $tamTrus = TamTru::with('nhanKhau')
                ->whereTime('created_at', '>', $request->ngayBatDau)
                ->whereTime('created_at', '<', $request->ngayKetThuc)
                ->orderBy('id', 'ASC');

            return response()->json([
                'data' => ['tamVangs' => $tamVangs, 'tamTrus' => $tamTrus],
                'success' => true,
                'message' => 'success',
            ], 200);

        } catch (Exception $exception)
        {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }
}
