<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasTranslations;

class Package extends Model
{
    use HasTranslations;
    protected $fillable = [
        'translations',
        'service_id', 'name', 'level', 'description', 'base_price', 'delivery_time', 'is_active'
    ];

    protected $casts = [
        'translations' => 'array',
        'base_price' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function items()
    {
        return $this->hasMany(PackageItem::class);
    }

    public function quotationItems()
    {
        return $this->hasMany(QuotationItem::class);
    }
}
