<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PrintOption extends Model
{
    protected $fillable = [
        'group_id', 'name', 'description', 'price', 'price_type', 'is_default', 'order', 'translations',
    ];

    protected $casts = [
        'price' => 'float',
        'is_default' => 'boolean',
        'order' => 'integer',
        'translations' => 'array',
    ];

    public function group()
    {
        return $this->belongsTo(PrintOptionGroup::class, 'group_id');
    }

    public function toPublicArray(string $lang): array
    {
        $tr = is_array($this->translations) ? $this->translations : [];
        $name = $this->name;
        $description = $this->description;
        if (in_array($lang, ['fa', 'ps'])) {
            if (($tr[$lang]['name'] ?? null) !== null && $tr[$lang]['name'] !== '') $name = $tr[$lang]['name'];
            if (($tr[$lang]['description'] ?? null) !== null && $tr[$lang]['description'] !== '') $description = $tr[$lang]['description'];
        }
        return [
            'id' => $this->id,
            'name' => $name,
            'description' => $description,
            'price' => $this->price,
            'price_type' => $this->price_type,
            'is_default' => $this->is_default,
        ];
    }
}