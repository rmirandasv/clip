<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DirectoryController;
use App\Http\Controllers\DocumentController;
use Illuminate\Support\Facades\Route;

Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
Route::post('/directories', [DirectoryController::class, 'store'])->name('directories.store');
Route::get('/directories', [DirectoryController::class, 'index'])->name('directories.index');
Route::get('/directories/{directory}', [DirectoryController::class, 'show'])->name('directories.show');
Route::get('/directories/{directory}/documents/create', [DocumentController::class, 'create'])->name('documents.create');
Route::post('/directories/{directory}/documents', [DocumentController::class, 'store'])->name('documents.store');
Route::get('/directories/{directory}/documents/{file}', [DocumentController::class, 'show'])->name('documents.show');
Route::get('/directories/{directory}/documents/{file}/edit', [DocumentController::class, 'edit'])->name('documents.edit');
Route::put('/directories/{directory}/documents/{file}', [DocumentController::class, 'update'])->name('documents.update');
Route::delete('/directories/{directory}/documents/{file}', [DocumentController::class, 'destroy'])->name('documents.destroy');
