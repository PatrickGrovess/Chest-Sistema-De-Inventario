<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Testing\Fluent\Concerns\Has;

class Product extends Model
{
    //
    protected $fillable = [
        "name",
        "price",
        "code",
        "units"

    ];

    public function inventory(): HasOne
{
    return $this->hasOne(Inventory::class, 'product_id');
}
}
