<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Traits\HasTranslations;

class TeamMember extends Model
{
    use HasTranslations;
    protected $fillable = [
        'translations',
        'name', 'slug', 'position', 'bio', 'photo', 'email', 'phone', 'order', 'is_published'
    ];

    protected $casts = [
        'translations' => 'array',
        'is_published' => 'boolean',
    ];
}
