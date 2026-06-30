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
        Schema::create('products', function (Blueprint $table) {
            $table->id(); // 🔑 Crea automáticamente un INT AUTO_INCREMENT PRIMARY KEY
            $table->string('name', 255); // 📝 Nombre del producto
            $table->decimal('price', 12, 2); // 💰 Precio decimal (hasta 12 dígitos, 2 decimales)
            $table->string('code', 45)->unique(); // 🏷️ Código/SKU único (¡para que no se repita!)
            $table->integer('units', 45); // 📦 Tipo de unidad (ej: "Cajas", "Pares", "Unidades")
            $table->timestamps(); // ⏱️ Crea automáticamente las columnas 'created_at' y 'updated_at'
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
