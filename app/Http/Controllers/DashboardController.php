<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $directories = Storage::disk('local')->directories();
        $directories = array_map(fn ($directory) => basename($directory), $directories);
        $documents = Storage::disk('local')->files();
        $documents = array_map(fn ($document) => basename($document), $documents);

        return Inertia::render('dashboard', compact('directories', 'documents'));
    }
}
