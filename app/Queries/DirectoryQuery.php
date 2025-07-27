<?php

namespace App\Queries;

use Illuminate\Support\Facades\Log;
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

    public function files(string $directory, bool $fullPath = false): array
    {
        $files = array_map(fn ($file) => $fullPath ? $file : basename($file), Storage::disk($this->disk)->files($directory));
        $files = array_filter($files, fn ($file) => str_ends_with($file, '.md'));

        return $files;
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

    public function storageUsed(): int
    {
        $directories = $this->get();
        $storage = 0;
        foreach ($directories as $directory) {
            $files = $this->files($directory, true);
            foreach ($files as $file) {
                $storage += Storage::disk($this->disk)->size($file);
            }
        }

        return $storage;
    }

    public function storageUsedFormatted(): string
    {
        $storageUsed = $this->storageUsed();

        return match (true) {
            $storageUsed > 1024 * 1024 * 1024 => sprintf('%.2f GB', $storageUsed / 1024 / 1024 / 1024),
            $storageUsed > 1024 * 1024 => sprintf('%.2f MB', $storageUsed / 1024 / 1024),
            default => sprintf('%.2f KB', $storageUsed / 1024),
        };
    }
}