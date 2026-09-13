<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait HasTranslations
{
    protected array $translatableFields = ['title', 'name', 'description', 'content', 'excerpt', 'question', 'answer', 'position', 'bio', 'challenge', 'solution', 'outcome', 'category'];

    public function getTranslatableFields(): array
    {
        return property_exists($this, 'translatableFields') ? $this->translatableFields : $this->translatableFields;
    }

    public function localize(string $lang): array
    {
        if ($lang === 'en' || !in_array($lang, ['fa', 'ps'])) {
            return $this->toArray();
        }

        $data = $this->toArray();
        $translations = is_array($this->translations) ? $this->translations : (json_decode((string) $this->translations, true) ?: []);

        foreach ($this->getTranslatableFields() as $field) {
            if (!array_key_exists($field, $data)) {
                continue;
            }
            $translated = $translations[$lang][$field] ?? null;
            if ($translated !== null && $translated !== '') {
                $data[$field] = $translated;
            }
        }

        return $data;
    }

    public static function localizeCollection($collection, string $lang): array
    {
        return $collection->map(fn ($model) => $model->localize($lang))->values()->all();
    }
}
