<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * LISTAR: Muestra todos los productos en el catálogo
     */
    public function index()
    {
        // Eloquent va a MySQL y hace un SELECT * FROM products
        $products = Product::all();
        
        return response()->json($products, 200);
    }

    /**
     * CREAR: Guarda un producto nuevo enviado desde el frontend
     */
    public function store(Request $request)
    {
        // 1. Recolectamos los datos que viajan de React (gracias al objeto $request)
        // 2. Usamos el método 'create' de Eloquent, que automáticamente aplica el filtro del $fillable
        $product = Product::create([
            'name'  => $request->name,
            'price' => $request->price,
            'code'  => $request->code,
            'units' => $request->units,
        ]);

        // Retornamos el producto recién creado con un código de estado 201 (Creado con éxito)
        return response()->json($product, 201);
    }

    public function show(string $id) {}
    public function update(Request $request, string $id) {}
    public function destroy(string $id) {}
}