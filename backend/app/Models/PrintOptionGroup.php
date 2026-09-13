<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PrintOptionGroup extends Model
{
    protected $fillable = [
        'product_id', 'name', 'type', 'required', 'order', 'translations',
    ];

    protected $casts = [
        'required' => 'boolean',
        'order' => 'integer',
        'translations' => 'array',
    ];

    public function product()
    {
        return $this->belongsTo(PrintProduct::class, 'product_id');
    }

    public function options()
    {
        return $this->hasMany(PrintOption::class, 'group_id')->orderBy('order');
    }

    public function toPublicArray(string $lang): array
    {
        $data = [
            'id' => $this->id,
            'name' => $this->localizeField('name', $lang),
            'type' => $this->type,
            'required' => $this->required,
            'order' => $this->order,
            'options' => $this->options->map(fn ($o) => $o->toPublicArray($lang))->values()->all(),
        ];
        return $data;
    }

    private function localizeField(string $field, string $lang): ?string
    {
        if ($lang === 'en' || !in_array($lang, ['fa', 'ps'])) {
            return $this->{$field};
        }
        $tr = is_array($this->translations) ? $this->translations : [];
        $translated = $tr[$lang][$field] ?? null;
        return ($translated !== null && $translated !== '') ? $translated : $this->{$field};
    }
}