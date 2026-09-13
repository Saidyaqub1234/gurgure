<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Customer extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name', 'organization_name', 'email', 'password', 'phone', 'avatar', 'address',
        'password_reset_token', 'password_reset_expires_at',
    ];

    protected $hidden = [
        'password', 'password_reset_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'password_reset_expires_at' => 'datetime',
        ];
    }

    public function quotations()
    {
        return $this->hasMany(Quotation::class);
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function receipts()
    {
        return $this->hasMany(Receipt::class);
    }
}
