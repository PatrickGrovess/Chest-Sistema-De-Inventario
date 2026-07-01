<?php

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post("login", function () {
    return response()->json(["message" => "Inicio de sesión"]);
});
Route::post("register", function () {
    return response()->json(["message" => "Inicio de sesión"]);
});
Route::get('/products', function () {

    // Eloquent ORM: Trae absolutamente todos los registros de la tabla products en MySQL
    $todosLosProductos = Product::all(); 
    
    // Lo escupimos en formato JSON automáticamente
    return response()->json($todosLosProductos);

    // return response()->json(['message' => 'Aquí listaremos todos los productos con su stock']);
});

Route::post('/products', function () {
    return response()->json(['message' => 'Aquí el administrador podrá agregar un producto nuevo']);
});

Route::put('/products/{id}', function () {
    return response()->json(['message' => 'Aquí se actualizarán los datos o existencias de un producto']);
});

Route::delete('/products/{id}', function () {
    return response()->json(['message' => 'Aquí se eliminará un producto en cascada']);
});
