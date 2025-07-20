<?php

namespace App\Actions;

use Illuminate\Support\Facades\Storage;

class CreateDirectory
{
    public function handle($name): string
    {
        if (Storage::disk('local')->exists($name)) {
            throw new \Exception('Directory already exists');
        }

        Storage::disk('local')->makeDirectory($name);

        return $name;
    }
}
