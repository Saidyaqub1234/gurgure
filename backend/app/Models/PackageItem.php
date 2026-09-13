<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasTranslations;

class PackageItem extends Model
{
    use HasTranslations;
    protected $fillable = [
        'translations',
        'package_id', 'name', 'description', 'price', 'pricing_type', 'quantity_enabled', 'is_optional', 'is_active'
    ];

    protected $casts = [
        'translations' => 'array',
        'price' => 'decimal:2',
        'quantity_enabled' => 'boolean',
        'is_optional' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function package()
    {
        return $this->belongsTo(Package::class);
    }

    public function quotationItems()
    {
        return $this->hasMany(QuotationItem::class);
    }
}
