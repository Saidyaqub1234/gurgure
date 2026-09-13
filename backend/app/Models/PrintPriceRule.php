<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PrintPriceRule extends Model
{
    protected $fillable = [
        'product_id', 'min_qty', 'max_qty', 'unit_price',
    ];

    protected $casts = [
        'min_qty' => 'integer',
        'max_qty' => 'integer',
        'unit_price' => 'float',
    ];

    public function product()
    {
        return $this->belongsTo(PrintProduct::class, 'product_id');
    }
}