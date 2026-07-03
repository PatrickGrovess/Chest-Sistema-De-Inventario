import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from './services/productService';

export default function Login() {
  const navigate = useNavigate(); // Hook de navegación

  // Almacenamiento de Credenciales.
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('admin'); // Controlador de estados
  const [loading, setLoading] = useState(false); // Controlador de carga

  // Controlador para capturar lo que se escribe
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value // Actualiza los campos de manera dinámica
    });
  };

  // Trigger "Ingresar al sistema"
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue por defecto
    setLoading(true); // TEMPORAL

    setTimeout(() => {
      const dataToSubmit = { ...credentials, role };
      console.log("Enviando datos a Laravel", dataToSubmit);

      setLoading(false); // Apagamos TEMPORAL
      navigate('/home');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans p-4">

      {/* Contenedor de la tarjeta de Login */}
      <div className="bg-chestCard/90 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-white/5 w-full max-w-md">

        {/* EL ÍCONO */}
        <div className="flex items-center justify-center w-14 h-14 bg-chestAccent rounded-2xl shadow-lg shadow-chestAccent/20 mb-5 text-white mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3.9a2 2 0 0 1-1.6-.8L13.4 3.4a2 2 0 0 0-1.6-.8H4a2 2 0 0 0-2 2v15.4a2 2 0 0 0 2 2z" />
            <path d="M2 8h20" />
            <path d="M12 11v7" />
            <path d="M9 14h6" />
          </svg>
        </div>

        {/* Título y subtítulo */}
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          CHEST
        </h2>
        <p className="text-gray-400 text-sm text-center mb-8">
          Sistema de Control de Inventario
        </p>

        {/* SWITCH DE ROL */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-400 mb-2 tracking-wider text-left uppercase">
            Rol de Acceso
          </label>
          <div className="grid grid-cols-2 gap-1 bg-[#162326]/40 border border-white/5 p-1 rounded-xl text-sm font-medium relative">

            {/* Botón Admin */}
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`py-2 rounded-lg transition-all duration-200 ${role === 'admin'
                  ? 'bg-chestAccent text-[#e6edf3] font-bold shadow-md shadow-chestAccent/20'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              Admin
            </button>

            {/* Botón Usuario */}
            <button
              type="button"
              onClick={() => setRole('user')}
              className={`py-2 rounded-lg transition-all duration-200 ${role === 'user'
                  ? 'bg-chestAccent text-[#e6edf3] font-bold shadow-md shadow-chestAccent/20'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              Staff User
            </button>

          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          {/* Campo de Correo */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="user@E-mail.com"
              className="w-full bg-chestBorder/60 border border-white/5 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-chestAccent focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Campo de Contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Contraseña
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-chestBorder/60 border border-white/5 text-white placeholder-gray-500 rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-chestAccent focus:border-transparent transition-all"
                required
              />

              {/* BOTÓN DEL OJO VECTORIAL */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Botón de envío Inteligente */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-chestAccent hover:brightness-90 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 text-[#e6edf3] font-bold py-3 rounded-xl shadow-lg shadow-chestAccent/10 transition-all text-sm mt-2 flex items-center justify-center"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-[#e6edf3]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Validando...</span>
              </div>
            ) : (
              "Ingresar al Sistema"
            )}
          </button>
        </form>

      </div>
    </div>
  );
}