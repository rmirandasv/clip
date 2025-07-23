<?php

namespace App\Http\Controllers;

use App\Actions\CreateDocument;
use App\Actions\DeleteDocument;
use App\Actions\UpdateDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\YamlFrontMatter\YamlFrontMatter;

class DocumentController extends Controller
{
    public function create(string $directory)
    {
        return Inertia::render('documents/create', compact('directory'));
    }

    public function store(Request $request, string $directory, CreateDocument $createDocument)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'tags' => 'nullable|array',
            'content' => 'required|string',
        ]);

        $createDocument->handle($directory, $request->name, $request->content, $request->tags ?? []);

        return redirect()->route('directories.show', $directory);
    }

    public function show(string $directory, string $file)
    {
        $content = Storage::disk('local')->get(sprintf('%s/%s', $directory, $file));

        return Inertia::render('documents/show', compact('directory', 'file', 'content'));
    }

    public function edit(string $directory, string $file)
    {
        $raw = Storage::disk('local')->get(sprintf('%s/%s', $directory, $file));

        $yaml = YamlFrontMatter::parse($raw);
        $matter = $yaml->matter();
        $content = $yaml->body();
        $name = $matter['title'];
        $tags = $matter['tags'];

        return Inertia::render('documents/edit', compact('directory', 'file', 'name', 'tags', 'content'));
    }

    public function update(Request $request, string $directory, string $file, UpdateDocument $updateDocument)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'content' => 'required|string',
            'tags' => 'nullable|array',
        ]);

        $updateDocument->handle($directory, $file, $request->name, $request->content, $request->tags ?? []);

        return redirect()->route('directories.show', $directory);
    }

    public function destroy(string $directory, string $file, DeleteDocument $deleteDocument)
    {
        $deleteDocument->handle($directory, $file);

        return redirect()->route('directories.show', $directory);
    }
}
