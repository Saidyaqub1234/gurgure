<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasTranslations;

class Service extends Model
{
    use HasTranslations;
    protected $fillable = [
        'translations',
        'title', 'slug', 'description', 'icon', 'image', 'items', 'order', 'is_published', 'category'
    ];

    protected $casts = [
        'translations' => 'array',
        'items' => 'array',
        'is_published' => 'boolean',
    ];

    public function packages()
    {
        return $this->hasMany(Package::class);
    }
}
