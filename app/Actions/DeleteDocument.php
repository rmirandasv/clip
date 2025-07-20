<?php

namespace App\Actions;

use Illuminate\Support\Facades\Storage;

class DeleteDocument
{
    public function handle(string $directory, string $file): void
    {
        $path = sprintf('%s/%s', $directory, $file);
        $document = Storage::disk('local')
            ->exists($path);

        if (! $document) {
            throw new \Exception('Document not found');
        }

        Storage::disk('local')->delete($path);
    }
}
