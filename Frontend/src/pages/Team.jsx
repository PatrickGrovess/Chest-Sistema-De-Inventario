import React, { useState } from 'react';

import { getProducts } from './services/productService';
export default function Team() {
  // Simulación del usuario que está logueado actualmente en la app
  // Puedes cambiarlo a 'Espectador' para probar cómo se bloquean los botones de eliminar/agregar
  const [currentUserRole, setCurrentUserRole] = useState('Administrador');

  // Estado con la lista inicial de integrantes del equipo
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Carlos Mendoza', email: 'carlos@chest.com', role: 'Administrador', avatar: '👨‍💻' },
    { id: 2, name: 'Ana Gómez', email: 'ana@chest.com', role: 'Espectador', avatar: '👩‍💼' },
    { id: 3, name: 'Luis Peralta', email: 'luis@chest.com', role: 'Espectador', avatar: '👨‍🎨' }
  ]);

  // Estados para controlar el modal de agregar integrante
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'Espectador' // Rol por defecto al invitar
  });

  // Función para agregar un nuevo miembro al equipo
  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.email) return;

    const memberToAdd = {
      id: Date.now(),
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      avatar: newMember.role === 'Administrador' ? '⚡' : '👁️'
    };

    setTeamMembers(prev => [...prev, memberToAdd]);

    // Resetear formulario y cerrar modal
    setNewMember({ name: '', email: '', role: 'Espectador' });
    setIsModalOpen(false);
  };

  // Función para eliminar un miembro (Solo permitida para Administradores)
  const handleDeleteMember = (id) => {
    if (currentUserRole !== 'Administrador') {
      alert('No tienes permisos para eliminar miembros.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas eliminar a este integrante del equipo?')) {
      setTeamMembers(prev => prev.filter(member => member.id !== id));
    }
  };

  // Función para cambiar el rol directamente desde la lista (Solo Administradores)
  const handleChangeRole = (id, newRole) => {
    if (currentUserRole !== 'Administrador') {
      alert('No tienes permisos para cambiar roles.');
      return;
    }
    setTeamMembers(prev => prev.map(member =>
      member.id === id ? { ...member, role: newRole } : member
    ));
  };

  return (
    <div className="space-y-6 text-left pb-16">

      {/* INDICADOR DE ROL ACTUAL (Para pruebas en desarrollo) */}
      <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex items-center justify-between text-xs text-gray-400">
        <span>Vista de desarrollo — Rol actual en la sesión: <strong>{currentUserRole}</strong></span>
        <button
          onClick={() => setCurrentUserRole(currentUserRole === 'Administrador' ? 'Espectador' : 'Administrador')}
          className="px-2.5 py-1 bg-white/10 hover:bg-white/10 rounded-lg text-white font-medium"
        >
          Cambiar rol de prueba
        </button>
      </div>

      {/* ENCABEZADO DE LA SECCIÓN */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Miembros del Equipo</h2>
          <p className="text-xs text-gray-400 mt-0.5">Gestiona los accesos y roles de las personas en este inventario.</p>
        </div>

        {/* El botón de agregar miembro se deshabilita visualmente si el usuario es Espectador */}
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={currentUserRole !== 'Administrador'}
          className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center gap-2 ${currentUserRole === 'Administrador'
              ? 'bg-chestAccent hover:bg-chestAccent/90 text-chestBg cursor-pointer'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-50'
            }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" x1="19" y1="8" y2="14" /><line x1="16" x1="22" y1="11" y2="11" /></svg>
          Agregar Integrante
        </button>
      </div>

      {/* TARJETAS / LISTA DE INTEGRANTES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-chestCard/80 border border-white/5 rounded-2xl p-5 flex items-center justify-between hover:border-white/10 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-2xl">
                {member.avatar}
              </div>
              <div>
                <h4 className="font-bold text-white text-base">{member.name}</h4>
                <p className="text-xs text-gray-400">{member.email}</p>
                <span className={`inline-block mt-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${member.role === 'Administrador'
                    ? 'bg-chestAccent/10 text-chestAccent border border-chestAccent/20'
                    : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}>
                  {member.role}
                </span>
              </div>
            </div>

            {/* CONTROLES DE ADMINISTRACIÓN (Solo activos si eres Administrador) */}
            <div className="flex flex-col items-end gap-2">
              {currentUserRole === 'Administrador' ? (
                <>
                  <select
                    value={member.role}
                    onChange={(e) => handleChangeRole(member.id, e.target.value)}
                    className="bg-white/5 border border-white/5 text-xs text-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:border-chestAccent"
                  >
                    <option value="Administrador" className="bg-chestCard text-white">Administrador</option>
                    <option value="Espectador" className="bg-chestCard text-white">Espectador</option>
                  </select>

                  <button
                    onClick={() => handleDeleteMember(member.id)}
                    className="text-xs text-red-400 hover:text-red-300 font-medium px-2 py-1 rounded-md hover:bg-red-500/10 transition-all"
                  >
                    Eliminar
                  </button>
                </>
              ) : (
                <span className="text-xs text-gray-500 italic">Sin acciones</span>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* MODAL DE INVITACIÓN / AGREGAR MIEMBRO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-chestCard border border-white/10 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden text-left animate-in fade-in zoom-in-95 duration-150">

            <div className="p-6 border-b border-white/5">
              <h3 className="text-lg font-bold text-white">Invitar Nuevo Miembro</h3>
              <p className="text-xs text-gray-400 mt-0.5">Asigna los permisos iniciales para el inventario corporativo.</p>
            </div>

            <form onSubmit={handleAddMember} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Juan Pérez"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-chestAccent placeholder-gray-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  placeholder="juan@correo.com"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-chestAccent placeholder-gray-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Rol Asignado</label>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setNewMember({ ...newMember, role: 'Espectador' })}
                    className={`p-3 rounded-xl border text-left transition-all ${newMember.role === 'Espectador'
                        ? 'bg-blue-500/10 border-blue-500 text-white'
                        : 'bg-white/5 border-transparent text-gray-400 hover:border-white/10'
                      }`}
                  >
                    <p className="text-xs font-bold">Espectador</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Solo lectura, no altera datos.</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewMember({ ...newMember, role: 'Administrador' })}
                    className={`p-3 rounded-xl border text-left transition-all ${newMember.role === 'Administrador'
                        ? 'bg-chestAccent/10 border-chestAccent text-white'
                        : 'bg-white/5 border-transparent text-gray-400 hover:border-white/10'
                      }`}
                  >
                    <p className="text-xs font-bold">Administrador</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Lectura, escritura y control total.</p>
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold rounded-xl hover:bg-red-500/20 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-chestAccent hover:bg-chestAccent/90 text-chestBg text-sm font-bold rounded-xl transition-all shadow-lg"
                >
                  Invitar
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}