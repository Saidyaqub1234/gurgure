<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Receipt extends Model
{
    protected $fillable = [
        'receipt_no', 'invoice_id', 'payment_id', 'customer_id', 'amount', 'issued_date'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'issued_date' => 'date',
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($receipt) {
            if (!$receipt->receipt_no) {
                $receipt->receipt_no = 'RCP-' . now()->format('Ymd') . '-' . str_pad(self::whereDate('created_at', today())->count() + 1, 4, '0', STR_PAD_LEFT);
            }
            if (!$receipt->issued_date) {
                $receipt->issued_date = now();
            }
        });
    }
}
