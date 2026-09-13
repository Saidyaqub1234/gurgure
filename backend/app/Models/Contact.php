<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    protected $fillable = [
        'name', 'organization', 'email', 'phone', 'service_interest', 'message', 'is_read'
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];
}
