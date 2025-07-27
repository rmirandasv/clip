<?php

namespace App\Http\Controllers;

use App\Queries\DirectoryQuery;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(DirectoryQuery $directoryQuery)
    {
        $directories = $directoryQuery->get();
        $documents = array_merge(...array_map(fn ($directory) => $directoryQuery->files($directory, true), $directories));
        $storageUsed = $directoryQuery->storageUsedFormatted();

        return Inertia::render('dashboard', compact('directories', 'documents', 'storageUsed'));
    }
}
