<?php

namespace App\Http\Controllers;

use App\Actions\CreateDirectory;
use App\Queries\DirectoryQuery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DirectoryController extends Controller
{
    public function index(DirectoryQuery $query)
    {
        $directories = $query->toArray();

        return Inertia::render('directories/index', compact('directories'));
    }

    public function store(Request $request, CreateDirectory $createDirectory)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $directory = $createDirectory->handle($request->name);

        return redirect()->back()->with([
            'flash' => [
                'message' => 'Directory created successfully',
                'type' => 'success',
            ],
        ]);
    }

    public function show(string $directory, DirectoryQuery $query)
    {
        $files = $query->files($directory);

        return Inertia::render('directories/show', compact('directory', 'files'));
    }
}
