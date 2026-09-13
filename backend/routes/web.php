<?php

use Illuminate\Support\Facades\Route;

Route::get('/{any?}', function () {
    return redirect()->to('http://localhost:5173/' . ltrim(request()->path(), '/'));
})->where('any', '.*');
