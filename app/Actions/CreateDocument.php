<?php

namespace App\Actions;

use Illuminate\Support\Facades\Storage;
use Symfony\Component\Yaml\Yaml;

class CreateDocument
{
    public function handle(string $directory, string $name, string $content, array $tags = []): void
    {
        $path = sprintf('%s/%s.md', $directory, $name);
        $matter = [
            'title' => $name,
            'tags' => $tags,
        ];
        $matter = Yaml::dump($matter);
        $content = sprintf("---\n%s---\n\n%s", $matter, $content);
        Storage::disk('local')->put($path, $content);
    }
}
