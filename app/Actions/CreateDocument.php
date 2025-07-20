<?php

namespace App\Actions;

use Illuminate\Support\Facades\Storage;

class CreateDocument
{
    public function handle(string $directory, string $name, string $content): void
    {
        $path = sprintf('%s/%s.md', $directory, $name);
        Storage::disk('local')->put($path, $content);
    }
}
