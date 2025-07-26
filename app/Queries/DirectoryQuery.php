<?php

namespace App\Queries;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

class DirectoryQuery
{
    protected ?Collection $directories = null;

    public function __construct(protected string $disk = 'local', protected string $directory = '')
    {
        
    }

    public function query(): self
    {
        $directories = Storage::disk($this->disk)->directories($this->directory);
        $this->directories = collect($directories);

        return $this;
    }

    public function all(): Collection
    {
        if (! $this->directories) {
            $this->query();
        }

        return $this->directories;
    }

    public function first(): string
    {
        if (! $this->directories) {
            $this->query();
        }

        return $this->directories->first();
    }

    public function last(): string
    {
        if (! $this->directories) {
            $this->query();
        }

        return $this->directories->last();
    }

    public function count(): int
    {
        if (! $this->directories) {
            $this->query();
        }

        return $this->directories->count();
    }

    public function get(): Collection
    {
        if (! $this->directories) {
            $this->query();
        }

        return $this->directories;
    }

    public function toArray(): array
    {
        if (! $this->directories) {
            $this->query();
        }

        return $this->directories->toArray();
    }

    public function search(string $query): Collection
    {
        if (! $this->directories) {
            $this->query();
        }

        return $this->directories->filter(fn ($directory) => str_contains($directory, $query));
    }

    public function files(string $directory): array
    {
        return array_map(fn ($file) => basename($file), Storage::disk($this->disk)->files($directory));
    }
}