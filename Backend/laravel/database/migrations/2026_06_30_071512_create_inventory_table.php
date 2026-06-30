<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inventory', function (Blueprint $table) {
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');

            $table->integer('warehouse_id')->nullable(); // ID del almacén (puede ser null por ahora)
            $table->integer('stock')->default(0); // Existencias actuales, empieza en 0 por defecto
            $table->integer('minimum_stock')->default(0); // Alerta de stock mínimo, empieza en 0
            $table->integer('maximum_stock')->nullable(); // Alerta de stock máximo (opcional)
            $table->timestamps(); // Registra created_at y updated_at automáticamente
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory');
    }
};
