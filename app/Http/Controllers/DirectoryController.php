<?php

namespace App\Http\Controllers;

use App\Actions\CreateDirectory;
use App\Queries\DirectoryQuery;
use App\Queries\DocumentQuery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DirectoryController extends Controller
{
    public function index(Request $request, DirectoryQuery $directoryQuery)
    {
        $directories = $directoryQuery
            ->searchIf($request->input('search', ''))
            ->sort($request->input('sort', 'asc'))
            ->get();

        return Inertia::render('directories/index', compact('directories'));
    }

    public function store(Request $request, CreateDirectory $createDirectory)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $directory = $createDirectory->handle($request->name);

        return redirect()->route('directories.show', $directory);
    }

    public function show(string $directory, Request $request, DocumentQuery $query)
    {
        $files = $query->directory($directory)
            ->searchIf($request->input('search', ''))
            ->sort($request->input('sort', 'asc'))
            ->get();

        return Inertia::render('directories/show', compact('directory', 'files'));
    }
}
