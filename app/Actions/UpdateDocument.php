<?php

namespace App\Actions;

use Illuminate\Support\Facades\Storage;

class UpdateDocument
{
    public function handle(string $directory, string $file, string $name, string $content): void
    {
        Storage::disk('local')->put(sprintf('%s/%s', $directory, $file), $content);
    }
}
