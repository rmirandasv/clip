<?php

namespace App\Actions;

use Illuminate\Support\Facades\Storage;
use Symfony\Component\Yaml\Yaml;

class UpdateDocument
{
    public function handle(string $directory, string $file, string $name, string $content, array $tags = []): void
    {
        $matter = [
            'title' => $name,
            'tags' => $tags,
        ];

        $matter = Yaml::dump($matter);
        $content = sprintf("---\n%s---\n\n%s", $matter, $content);

        if ($name !== $file) {
            Storage::disk('local')->delete(sprintf('%s/%s.md', $directory, $file));
        }

        Storage::disk('local')->put(sprintf('%s/%s.md', $directory, $name), $content);
    }
}
