<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PrintOrder extends Model
{
    protected $fillable = [
        'order_no', 'customer_id', 'name', 'email', 'phone', 'address',
        'items', 'subtotal', 'total', 'status', 'notes',
    ];

    protected $casts = [
        'items' => 'array',
        'subtotal' => 'float',
        'total' => 'float',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}