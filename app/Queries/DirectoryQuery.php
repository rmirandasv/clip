<?php

namespace App\Queries;

use Illuminate\Support\Facades\Storage;

class DirectoryQuery
{
    protected array $directories = [];

    public function __construct(protected string $disk = 'local', protected string $directory = '')
    {
        $this->query();
    }

    private function query(): void
    {
        $directories = Storage::disk($this->disk)->directories($this->directory);
        $this->directories = $directories;
    }

    public function first(): ?string
    {
        return $this->directories[0] ?? null;
    }

    public function last(): ?string
    {
        return $this->directories[count($this->directories) - 1] ?? null;
    }

    public function count(): int
    {
        return count($this->directories);
    }

    public function get(): array
    {
        return array_values($this->directories);
    }

    public function search(string $query): self
    {
        $this->directories = array_filter($this->directories, fn ($directory) => str_contains($directory, $query));

        return $this;
    }

    public function files(string $directory): array
    {
        return array_map(fn ($file) => basename($file), Storage::disk($this->disk)->files($directory));
    }

    public function sort(string $direction = 'asc'): self
    {
        if ($direction === 'asc') {
            sort($this->directories);
        } else {
            rsort($this->directories);
        }

        return $this;
    }

    public function searchIf(?string $query): self
    {
        if (strlen($query) > 0) {
            $this->search($query);
        }

        return $this;
    }
}