<?php

namespace App\Queries;

use Illuminate\Support\Facades\Storage;

class DocumentQuery
{
    protected string $directory;

    protected array $files = [];

    public function __construct(protected string $disk = 'local') {}

    public function directory(string $directory): self
    {
        $this->directory = $directory;
        $this->files();

        return $this;
    }

    private function files(bool $fullPath = false): self
    {
        $this->files = array_map(fn ($file) => $fullPath ? $file : basename($file), Storage::disk($this->disk)->files($this->directory));
        $this->files = array_filter($this->files, fn ($file) => str_ends_with($file, '.md'));

        return $this;
    }

    public function get(): array
    {
        return $this->files;
    }

    public function search(string $query): self
    {
        $this->files = array_filter($this->files, fn ($file) => str_contains($file, $query));

        return $this;
    }

    public function sort(string $direction = 'asc'): self
    {
        if ($direction === 'asc') {
            sort($this->files);
        } else {
            rsort($this->files);
        }

        return $this;
    }

    public function searchIf(?string $query): self
    {
        if ($query) {
            $this->search($query);
        }

        return $this;
    }
}
