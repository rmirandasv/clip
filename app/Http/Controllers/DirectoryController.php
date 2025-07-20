<?php

namespace App\Http\Controllers;

use App\Actions\CreateDirectory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DirectoryController extends Controller
{
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

    public function show(string $directory)
    {
        $files = Storage::disk('local')->files($directory);
        $files = array_map(fn ($file) => basename($file), $files);

        return Inertia::render('directories/show', compact('directory', 'files'));
    }
}
