import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from './services/productService';

export default function Settings() {
  const navigate = useNavigate();

  // Estados para simular la edición de datos
  const [profile, setProfile] = useState({
    name: '',
    email: ''
  });

  const [workspaceName, setWorkspaceName] = useState('');
  const [notifications, setNotifications] = useState(true);

  // Función para simular el cierre de sesión
  const handleLogout = () => {
    if (confirm('¿Estás seguro de que deseas cerrar sesión en CHEST?')) {
      // Aquí borrarías tokens o localStorage en el futuro
      localStorage.removeItem('chest_inventory'); // Limpieza de ejemplo

      // Redirección directa al Login (Ruta raíz)
      navigate('/');
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert('Perfil actualizado correctamente (Simulado)');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-left pb-16">

      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Configuración</h2>
        <p className="text-xs text-gray-400 mt-0.5">Administra tus datos personales y las preferencias del sistema.</p>
      </div>

      <hr className="border-white/5" />

      {/* SECCIÓN 1: PERFIL */}
      <div className="bg-chestCard/80 border border-white/5 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-chestAccent uppercase tracking-wider">Mi Perfil</h3>

        <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400">Nombre Completo</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-chestAccent"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400">Correo Electrónico</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-chestAccent"
            />
          </div>

          <div className="sm:col-span-2 flex justify-end pt-2">
            <button type="submit" className="px-4 py-2 bg-white/10 hover:bg-white/15 text-white text-xs font-bold rounded-xl transition-all">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>

      {/* SECCIÓN 2: ESPACIO DE TRABAJO 
      <div className="bg-chestCard/80 border border-white/5 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-chestAccent uppercase tracking-wider">Inventario Activo (Workspace)</h3>
        
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-400">Nombre del Inventario / Empresa</label>
            <input 
              type="text" 
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder='Nombre del Workspace ejm: Mi inventario'
              className="w-full bg-white/5 border border-white/5 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-chestAccent"
            />
          </div>
          <p className="text-[11px] text-gray-500 italic">Este nombre es visible para todos los integrantes que invites en la pestaña de Equipo.</p>
        </div>
      </div>
        */}

      {/* SECCIÓN 3: PREFERENCIAS / ALERTAS */}
      <div className="bg-chestCard/80 border border-white/5 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-chestAccent uppercase tracking-wider">Notificaciones y Alertas</h3>

        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
          <div>
            <p className="text-sm font-bold text-white">Alertas de Stock Mínimo</p>
            <p className="text-xs text-gray-400 mt-0.5">Recibir avisos en el cuando un producto baje del stock minimo.</p>
          </div>

          {/* CONTENEDOR DEL SWITCH INTERACTIVO */}
          <button
            type="button"
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none cursor-pointer ${notifications ? 'bg-chestAccent' : 'bg-gray-700'
              }`}
          >
            {/* EL CÍRCULO QUE SE DESLIZA */}
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${notifications ? 'translate-x-6' : 'translate-x-0'
                }`}
            />
          </button>
        </div>
      </div>

      {/* SECCIÓN 4: SEGURIDAD Y CIERRE (ZONA PELIGROSA) */}
      <div className="bg-chestCard/80 border border-red-500/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider">Acciones de Cuenta</h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2">
          <div>
            <p className="text-sm font-bold text-white">Salir del Sistema</p>
            <p className="text-xs text-gray-400">Termina tu sesión actual de forma segura en este dispositivo.</p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x1="9" y1="12" y2="12" /></svg>
            Cerrar Sesión
          </button>
        </div>
      </div>

    </div>
  );
}