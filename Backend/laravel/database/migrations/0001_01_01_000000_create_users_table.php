<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */

    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name', 144); // Cambiado a un tamaño óptimo de 144
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable(); // Laravel usa esto para validar correos
            $table->string('password', 255); // Espacio perfecto para contraseñas encriptadas

            // 🚀 TU COLUMNA DE ROLES:
            $table->string('role', 45)->default('predetermined'); // Asigna 'predetermined' por defecto

            $table->rememberToken(); // Un token seguro que usa Laravel para la sesión de "Recordarme"
            $table->timestamps(); // Tus columnas created_at y updated_at
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
