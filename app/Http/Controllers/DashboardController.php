<?php

namespace App\Http\Controllers;

use App\Models\Dashboard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Exceptions\ApiInvalidRequestData;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $dashboard = Dashboard::all()->last();
        return response()->json($dashboard);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $this->validateRequest($request);
        $data['top_products'] = str_replace(["\"","\\"], ["'",""], $data['top_products']);
        $data['top_customers'] = str_replace(["\"","\\"], ["'",""], $data['top_customers']);
        $data['trend_seller'] = str_replace(["\"","\\"], ["'",""], $data['trend_seller']);
        $data['trend_region'] = str_replace(["\"","\\"], ["'",""], $data['trend_region']);
        $dashboard = Dashboard::create($data);
        return response()->json([
            'status'=>'Dashboard data has been stored succesfully',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Dashboard  $dashboard
     * @return \Illuminate\Http\Response
     */
    public function show(Dashboard $dashboard)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Dashboard  $dashboard
     * @return \Illuminate\Http\Response
     */
    public function edit(Dashboard $dashboard)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Dashboard  $dashboard
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Dashboard $dashboard)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Dashboard  $dashboard
     * @return \Illuminate\Http\Response
     */
    public function destroy(Dashboard $dashboard)
    {
        //
    }

    public function validateRequest($request, $thisModel = null){
        $validator = Validator::make($request->all(), [
            'total_revenue'=>'required',
            'total_order'=>'required',
            'total_customer'=>'required',
            'top_products'=>'required',
            'top_customers'=>'required',
            'trend_seller'=>'required',
            'trend_region'=>'required',
        ]);

        if ($validator->fails()){
            throw(new ApiInvalidRequestData($validator->errors()));
        }

        return $validator->validated();
    }
}
