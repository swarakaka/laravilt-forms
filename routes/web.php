<?php

use Illuminate\Support\Facades\Route;
use Laravilt\Forms\Http\Controllers\FileUploadController;

/*
|--------------------------------------------------------------------------
| Forms Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your plugin. These
| routes are loaded by the ServiceProvider within a group which
| contains the "web" middleware group.
|
*/

Route::prefix('uploads')
    ->name('uploads.')
    ->group(function () {
        Route::post('/', [FileUploadController::class, 'upload'])->name('upload');
        Route::delete('/', [FileUploadController::class, 'delete'])->name('delete');
        Route::post('/temporary-url', [FileUploadController::class, 'temporaryUrl'])->name('temporary-url');
        Route::get('/private', [FileUploadController::class, 'servePrivate'])->name('private');
    });
