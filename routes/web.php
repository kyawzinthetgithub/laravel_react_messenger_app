<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [HomeController::class, 'home'])->name('home');
    Route::get('/user/{user}', function () {})->name('chat.user');
    Route::get('/group/{group}', function () {})->name('chat.group');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
