<?php

namespace App\Http\Controllers;

use App\Models\NhanKhau;
use Illuminate\Http\Request;

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
}
