import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

import { getProducts } from '../pages/services/productService';

export default function MainLayout() {
  // Clases base para los botones de la barra inferior
  const navLinkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center gap-1 flex-1 py-2 text-xs font-medium transition-all ${isActive
      ? 'bg-chestAccent/10 text-chestAccent font-semibold scale-105 rounded-xl' // Estilo activo 
      : 'text-gray-400 hover:text-white'           // Estilo inactivo
    }`;

  return (
    <div className="min-h-screen bg-chestBg text-white pb-24">

      {/* HEADER SUPERIOR */}
      <header className="flex justify-between items-center bg-chestCard/40 border border-white/5 p-4 rounded-2xl backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="bg-chestAccent/10 text-chestAccent p-2 rounded-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /></svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">CHEST</h1>
            <p className="text-xs text-gray-400">Sistema de Inventarios</p>
          </div>
        </div>
        <button className="p-2 bg-white/5 border border-white/5 rounded-xl text-gray-400 relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-chestAccent rounded-full"></span>
        </button>
      </header>

      {/* EL OUTLET: Aquí se renderizará Home, Inventory, Team o Settings dinámicamente */}
      <main className="max-w-7xl mx-auto px-4 pt-6">
        <Outlet />
      </main>


      {/* BARRA HORIZONTAL ANCLADA AL PIE DE PÁGINA */}
      <nav className="fixed bottom-0 left-0 right-0 bg-chestCard/95 backdrop-blur-md border-t border-white/5 shadow-2xl z-50 px-4 py-2">
        <div className="max-w-md mx-auto flex items-center justify-between gap-2">

          {/* Botón Home */}
          <NavLink to="/home" className={navLinkClass}>
            <div className="p-1.5 rounded-xl transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
            </div>
            <span>Home</span>
          </NavLink>

          {/* Botón Inventario */}
          <NavLink to="/inventory" className={navLinkClass}>
            <div className="p-1.5 rounded-xl transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>
            </div>
            <span>Inventory</span>
          </NavLink>

          {/* Botón Equipo */}
          <NavLink to="/team" className={navLinkClass}>
            <div className="p-1.5 rounded-xl transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            </div>
            <span>Team</span>
          </NavLink>

          {/* Botón Ajustes */}
          <NavLink to="/settings" className={navLinkClass}>
            <div className="p-1.5 rounded-xl transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
            </div>
            <span>Settings</span>
          </NavLink>

        </div>
      </nav>
    </div>
  );
}