<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dashboard extends Model
{
    use HasFactory;

    protected $fillable = [
        'total_revenue',
        'total_order',
        'total_customer',
        'top_products',
        'top_customers',
        'trend_seller',
        'trend_region'
    ];
}
