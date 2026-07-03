import React, { useState } from 'react';
import { useEffect } from 'react';

import { getProducts } from './services/productService';

export default function Inventory() {
  // --- BASE DE DATOS LOCAL SIMULADA ---
  const [categories, setCategories] = useState([
    { id: 1, name: 'Ropa' },
    { id: 2, name: 'Vehículos' },
    { id: 3, name: 'Tecnología' },
    { id: 4, name: 'Electrodomésticos' },
    { id: 5, name: 'Herramientas' }
  ]);

  

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Kit de Herramientas Mecánicas',
      sku: 'HERR-001',
      categories: ['Herramientas', 'Tecnología'],
      stock: 12,
      price: 45.00,
      hasMinStockAlert: false,
      minStockLevel: '',
      mediaType: 'emoji',
      mediaValue: '🛠️'
    }
  ]);

  // --- ESTADOS DE CONTROL DE INTERFAZ ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // NUEVO: Estado para saber si estamos editando un producto
  const [editingProductId, setEditingProductId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    selectedCategories: [],
    stock: 0,
    price: 0,
    hasMinStockAlert: false,
    minStockLevel: '',
    mediaType: 'emoji',
    mediaValue: '📦'
  });

  const defaultEmojis = ['📦', '🛠️', '🚗', '👕', '💻', '🔌', '🔋', '🧱', '🔑', '⚙️'];

  // --- LÓGICA DE FILTRADO MULTI-CAMPO ---
  const filteredProducts = products.filter(product => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    const matchName = product.name.toLowerCase().includes(query);
    const matchSku = product.sku.toLowerCase().includes(query);
    const matchCategory = product.categories.some(cat => cat.toLowerCase().includes(query));

    return matchName || matchSku || matchCategory;
  });

  // --- GESTIÓN DE ARCHIVOS Y MULTIMEDIA ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const temporaryUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        mediaType: 'file',
        mediaValue: temporaryUrl
      });
    }
  };

  // --- MÉTODOS DE MANIPULACIÓN DE CATEGORÍAS ---
  const handleToggleCategory = (categoryName) => {
    setFormData(prev => {
      const exists = prev.selectedCategories.includes(categoryName);
      if (exists) {
        return { ...prev, selectedCategories: prev.selectedCategories.filter(c => c !== categoryName) };
      } else {
        return { ...prev, selectedCategories: [...prev.selectedCategories, categoryName] };
      }
    });
  };

  const handleCreateCategory = () => {
    if (!newCategoryName.trim()) return;
    if (categories.some(c => c.name.toLowerCase() === newCategoryName.trim().toLowerCase())) {
      alert("La categoría ya existe.");
      return;
    }

    const newCat = { id: Date.now(), name: newCategoryName.trim() };
    setCategories(prev => [...prev, newCat]);
    setFormData(prev => ({ ...prev, selectedCategories: [...prev.selectedCategories, newCat.name] }));
    setNewCategoryName('');
    setShowNewCategoryInput(false);
  };

  // --- NUEVO: MÉTODOS DE EDICIÓN Y ELIMINACIÓN ---
  const handleEditClick = (product) => {
    setFormData({
      name: product.name,
      sku: product.sku,
      selectedCategories: product.categories, // Cargamos las categorías en el formato que espera el form
      stock: product.stock,
      price: product.price,
      hasMinStockAlert: product.hasMinStockAlert || false,
      minStockLevel: product.minStockLevel || '',
      mediaType: product.mediaType,
      mediaValue: product.mediaValue
    });
    setEditingProductId(product.id);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (productId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  // --- CONTROL PERSISTENCIA LOCAL Y CIERRE ---
  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.sku) return;

    // Se unificó la creación de objeto para asegurar que 'selectedCategories'
    // se guarde como 'categories' para que la tabla pueda leerlo correctamente.
    const productData = {
      id: editingProductId ? editingProductId : Date.now(),
      name: formData.name,
      sku: formData.sku,
      categories: formData.selectedCategories,
      stock: Number(formData.stock),
      price: Number(formData.price),
      hasMinStockAlert: formData.hasMinStockAlert,
      minStockLevel: formData.minStockLevel,
      mediaType: formData.mediaType,
      mediaValue: formData.mediaValue
    };

    if (editingProductId) {
      // Si estamos editando, actualizamos el producto en el array
      setProducts(prev => prev.map(p => p.id === editingProductId ? productData : p));
    } else {
      // Si no, agregamos uno nuevo
      setProducts(prev => [...prev, productData]);
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setFormData({
      name: '',
      sku: '',
      selectedCategories: [],
      stock: 0,
      price: 0,
      hasMinStockAlert: false,
      minStockLevel: '',
      mediaType: 'emoji',
      mediaValue: '📦'
    });
    setEditingProductId(null); // Limpiamos el estado de edición
    setShowNewCategoryInput(false);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 relative pb-16">

      {/* ÁREA DE CONTROL: TÍTULO Y ACCIONES */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
        <h2 className="text-2xl font-bold tracking-tight text-left">Inventario</h2>

        {/* Barra de búsqueda integrada */}
        <div className="flex flex-1 max-w- gap-3 w-full justify-end">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar por nombre, SKU o categoría."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-xl pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-chestAccent placeholder-gray-500"
            />
            <span className="absolute left-3 top-2.5 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </span>
          </div>
          <button className="px-4 py-2 bg-white/5 border border-white/5 text-sm font-medium rounded-xl hover:bg-white/10 transition-all">
            Filtrar
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-chestAccent hover:bg-chestAccent/90 text-chestBg text-sm font-bold rounded-xl transition-all shadow-lg"
          >
            Agregar Producto
          </button>
        </div>
      </div>

      {/* TABLA PRINCIPAL */}
      <div className="bg-chestCard/80 border border-white/5 rounded-2xl overflow-hidden text-left">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.01] text-gray-400 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold">Ítem</th>
              <th className="p-4 font-semibold">SKU</th>
              <th className="p-4 font-semibold">Categorías</th>
              <th className="p-4 font-semibold text-center">Unidades</th>
              <th className="p-4 font-semibold text-right">Valor Unitario</th>
              <th className="p-4 font-semibold text-right">Valor Total</th>
              <th className="p-4 font-semibold text-center">Acciones</th> {/* NUEVA COLUMNA */}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-white/[0.01] transition-colors">
                <td className="p-4 flex items-center gap-3">
                  {product.mediaType === 'emoji' ? (
                    <span className="text-xl p-1.5 bg-white/5 rounded-lg w-10 h-10 flex items-center justify-center">{product.mediaValue}</span>
                  ) : (
                    <img src={product.mediaValue} alt={product.name} className="w-10 h-10 object-cover rounded-lg bg-white/5 border border-white/10" />
                  )}
                  <span className="font-medium text-white">{product.name}</span>
                </td>
                <td className="p-4 font-mono text-xs text-gray-400">{product.sku}</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {product.categories.map((cat, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white/5 border border-white/5 rounded-md text-xs text-gray-300">
                        {cat}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 text-center font-semibold text-gray-200">{product.stock}</td>
                <td className="p-4 text-right text-gray-300">${product.price.toFixed(2)}</td>
                <td className="p-4 text-right font-bold text-chestAccent">${(product.stock * product.price).toFixed(2)}</td>

                {/* NUEVO: CELDA DE ACCIONES */}
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="p-1.5 text-gray-400 hover:text-chestAccent hover:bg-chestAccent/10 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></svg>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product.id)}
                      className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                {/* Se incrementó colSpan a 7 para cubrir la nueva columna */}
                <td colSpan="7" className="p-8 text-center text-gray-500 italic">No se encontraron resultados de búsqueda</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-chestCard border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col text-left">

            <div className="p-6 border-b border-white/5">
              {/* Título dinámico basado en si estamos editando o creando */}
              <h3 className="text-lg font-bold">{editingProductId ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h3>
              <p className="text-xs text-gray-400 mt-0.5">Defina las especificaciones iniciales del artículo.</p>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-5 overflow-y-auto flex-1">

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Nombre</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-chestAccent" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">SKU</label>
                  <input type="text" required value={formData.sku} onChange={(e) => setFormData({ ...formData, sku: e.target.value })} className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-chestAccent" />
                </div>
              </div>

              {/* SECCIÓN CATEGORÍAS */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Categorías (Selección Múltiple)</label>
                <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 bg-white/[0.02] border border-white/5 rounded-xl">
                  {formData.selectedCategories.length === 0 && <span className="text-xs text-gray-500 italic px-1 self-center">Ninguna categoría seleccionada</span>}
                  {formData.selectedCategories.map((cat, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-chestAccent/10 border border-chestAccent/20 text-chestAccent rounded-lg text-xs font-medium">
                      {cat}
                      <button type="button" onClick={() => handleToggleCategory(cat)} className="hover:bg-chestAccent/20 rounded-full p-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12" /></svg></button>
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {categories.map((cat) => {
                    const isSelected = formData.selectedCategories.includes(cat.name);
                    return (
                      <button key={cat.id} type="button" onClick={() => handleToggleCategory(cat.name)} className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${isSelected ? 'bg-chestAccent/20 border-chestAccent text-white' : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20'}`}>{cat.name}</button>
                    );
                  })}
                </div>
                <div className="pt-2">
                  {!showNewCategoryInput ? (
                    <button type="button" onClick={() => setShowNewCategoryInput(true)} className="text-xs text-chestAccent hover:underline font-medium">+ Crear nueva categoría</button>
                  ) : (
                    <div className="flex gap-2 max-w-xs mt-1">
                      <input type="text" placeholder="Nombre" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none" />
                      <button type="button" onClick={handleCreateCategory} className="bg-chestAccent text-chestBg text-xs px-3 font-bold rounded-lg">Añadir</button>
                      <button type="button" onClick={() => { setShowNewCategoryInput(false); setNewCategoryName(''); }} className="text-xs text-gray-400 px-1">Cancelar</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Unidades</label>
                  <input type="number" min="0" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-sm text-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Valor Unitario ($)</label>
                  <input type="number" step="0.01" min="0" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-sm text-white" />
                </div>
              </div>

              {/* SECCIÓN OPCIONAL: ALERTA DE STOCK MÍNIMO */}
              <div className="bg-white/5 border border-white/5 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-bold text-white block">¿Recordar stock mínimo?</label>
                    <span className="text-[11px] text-gray-400">Te avisaremos cuando las unidades bajen del límite.</span>
                  </div>
                  {/* Switch*/}
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      hasMinStockAlert: !formData.hasMinStockAlert,
                      minStockLevel: !formData.hasMinStockAlert ? formData.minStockLevel : ''
                    })}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none cursor-pointer ${formData.hasMinStockAlert ? 'bg-chestAccent' : 'bg-gray-700'
                      }`}
                  >
                    {/*Ojo del Switch*/}
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${formData.hasMinStockAlert ? 'translate-x-5' : 'translate-x-0'
                        }`}
                    />
                  </button>
                </div>

                {formData.hasMinStockAlert && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/5 animate-fadeIn">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-400">Cantidad o % Mínimo</label>
                      <input
                        type="text"
                        placeholder="Ej: 5 o 10%"
                        value={formData.minStockLevel}
                        onChange={(e) => setFormData({ ...formData, minStockLevel: e.target.value })}
                        className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-chestAccent"
                      />
                    </div>
                    <div className="flex items-center">
                      <p className="text-[11px] text-gray-400 italic mt-4">
                        * Este umbral activará un indicador visual en tu Dashboard principal.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* SECCIÓN MULTIMEDIA COMPUESTA (FOTO O EMOJI) */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Identificador del Ítem (Foto o Emoji)</label>

                <div className="flex gap-2 p-1 bg-white/5 rounded-xl max-w-xs">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, mediaType: 'emoji', mediaValue: '📦' })}
                    className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-all ${formData.mediaType === 'emoji' ? 'bg-white/10 text-white font-bold' : 'text-gray-400'}`}
                  >
                    Usar Emoji
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, mediaType: 'file', mediaValue: '' })}
                    className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-all ${formData.mediaType === 'file' ? 'bg-white/10 text-white font-bold' : 'text-gray-400'}`}
                  >
                    Subir Imagen
                  </button>
                </div>

                <div className="flex items-center gap-4 p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                  <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden">
                    {formData.mediaType === 'emoji' ? (
                      <span className="text-3xl">{formData.mediaValue}</span>
                    ) : (
                      formData.mediaValue ? (
                        <img src={formData.mediaValue} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-600 text-xs text-center p-1">Sin foto</span>
                      )
                    )}
                  </div>

                  <div className="flex-1">
                    {formData.mediaType === 'emoji' ? (
                      <div className="grid grid-cols-5 gap-1.5">
                        {defaultEmojis.map((emoji, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setFormData({ ...formData, mediaValue: emoji })}
                            className={`text-lg p-1 rounded-md transition-all border ${formData.mediaValue === emoji ? 'bg-chestAccent/20 border-chestAccent scale-105' : 'bg-white/5 border-transparent'}`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="text-xs text-gray-400 file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
                        />
                        <p className="text-[10px] text-gray-500">Formatos admitidos: PNG, JPG o WEBP.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </form>

            <div className="p-4 bg-white/[0.02] border-t border-white/5 flex justify-end gap-3">
              <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold rounded-xl hover:bg-red-500/20 transition-all">Cancelar</button>
              {/* Botón dinámico basado en si estamos editando o creando */}
              <button onClick={handleSaveProduct} className="px-5 py-2 bg-chestAccent hover:bg-chestAccent/90 text-chestBg text-sm font-bold rounded-xl transition-all shadow-lg">
                {editingProductId ? 'Guardar Cambios' : 'Hecho'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}