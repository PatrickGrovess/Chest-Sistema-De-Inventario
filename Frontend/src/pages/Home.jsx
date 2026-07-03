import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import { getProducts } from './services/productService';


export default function Home() {
  const navigate = useNavigate();

  // -------------------------------------------------------------------------
  // Actualmente tienen datos de prueba (mocks), pero al conectar la API de Laravel,
  // estos estados se iniciarán vacíos (null, [] o 0) y se llenarán con una consulta SQL.
  // -------------------------------------------------------------------------

  // 1. Métricas Generales (SQL: SELECT COUNT(*)... / SELECT SUM(*)...)
  const [stats, setStats] = useState({
    totalProducts: 1240,
    lowStock: 8,
    dailyMovements: 45
  });

  // 2. Datos de la Gráfica (SQL: SELECT MONTH, SUM(entradas), SUM(salidas) GROUP BY MONTH)
  const [chartData, setChartData] = useState([
    { month: 'Jan', inbound: 420, outbound: 310 },
    { month: 'Feb', inbound: 380, outbound: 290 },
    { month: 'Mar', inbound: 510, outbound: 430 },
    { month: 'Apr', inbound: 470, outbound: 390 },
    { month: 'May', inbound: 600, outbound: 510 },
    { month: 'Jun', inbound: 640, outbound: 550 },
    { month: 'Jul', inbound: 700, outbound: 590 },
    { month: 'Aug', inbound: 820, outbound: 630 },
  ]);

  // 3. Productos Críticos (SQL: SELECT * FROM products WHERE stock <= min_stock LIMIT 5)
  const [criticalProducts, setCriticalProducts] = useState([
    { id: 1, name: 'Compresor de Aire 2HP', sku: 'COMP-02', stock: 2, minStock: 5 },
    { id: 2, name: 'Taladro Percutor Inalámbrico', sku: 'TAL-IN-12', stock: 1, minStock: 6 },
    { id: 3, name: 'Set de Destornilladores Cromo', sku: 'SET-DEST-24', stock: 4, minStock: 10 },
  ]);

  // 4. Historial de Movimientos (SQL: SELECT * FROM inventory_movements ORDER BY created_at DESC LIMIT 3)
  const [recentMovements, setRecentMovements] = useState([
    { id: 1, type: 'entrada', product: 'Discos de Corte 4.5"', qty: 50, user: 'Carlos M.', time: 'Hace 10 min' },
    { id: 2, type: 'salida', product: 'Inversor de Soldadura 160A', qty: 1, user: 'Andrés G.', time: 'Hace 45 min' },
    { id: 3, type: 'entrada', product: 'Lentes de Seguridad Claros', qty: 20, user: 'Carlos M.', time: 'Hace 2 horas' },
  ]);


  // -------------------------------------------------------------------------
  // CONEXIÓN BACKEND: DISPARADOR DE PETICIONES (fetch / axios)
  // Este bloque useEffect se ejecuta automáticamente cuando el usuario entra al Home.
  // Aquí es donde mandaremos a llamar las rutas de Laravel para traer la data real.
  // -------------------------------------------------------------------------
  useEffect(() => {
    // Ejemplo de cómo estructuraremos la llamada más adelante:
    /*
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token'); // Recuperamos el token del Login
        const response = await axios.get('http://tu-api-laravel.test/api/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Seteamos los estados con la info real de la base de datos MySQL:
        setStats(response.data.stats);
        setChartData(response.data.chart);
        setCriticalProducts(response.data.critical);
        setRecentMovements(response.data.movements);
      } catch (error) {
        console.error("Error cargando el Dashboard:", error);
      }
    };
    fetchDashboardData();
    */
    console.log(" Sistema listo para enganchar Axios/Fetch con Laravel");
  }, []);

  return (
    <div className="min-h-screen font-sans p-6 text-white">

      {/* 1. BARRA SUPERIOR DE NAVEGACIÓN / BIENVENIDA */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-chestCard/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 mb-8">
        <div>
          <div className="flex items-center gap-3">
            {/* Mini Ícono de la marca */}
            <div className="flex items-center justify-center w-8 h-8 bg-chestAccent rounded-lg text-[#08060d]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3.9a2 2 0 0 1-1.6-.8L13.4 3.4a2 2 0 0 0-1.6-.8H4a2 2 0 0 0-2 2v15.4a2 2 0 0 0 2 2z" /><path d="M2 8h20" /><path d="M12 11v7" /></svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">CHEST Dashboard</h1>
          </div>
          <p className="text-gray-400 text-sm mt-1">Bienvenido de vuelta, Administrador</p>
        </div>

        {/* Botón de Cerrar Sesión */}
        <button
          onClick={() => {
            console.log("Cerrando sesión...");
            navigate('/');
          }}
          className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white px-4 py-2 rounded-xl text-sm font-medium border border-white/5 transition-all"
        >
          Cerrar Sesión
        </button>
      </header>

      {/* 2. CUADRÍCULA DE TARJETAS DE MÉTRICAS (KPIs) */}
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Tarjeta: Total Productos */}
        <div className="bg-chestCard/80 border border-white/5 p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-chestAccent/20 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Total Productos</p>
              <h3 className="text-4xl font-black mt-2 tracking-tight">{stats.totalProducts}</h3>
            </div>
            <div className="p-3 bg-white/5 rounded-xl text-chestAccent">
              <svg xmlns="http://www.w3.org/2000/xl" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
            </div>
          </div>
          <p className="text-xs text-chestAccent mt-4 flex items-center gap-1">
            <span>↑ 12 nuevos este mes</span>
          </p>
        </div>

        {/* Tarjeta: Stock Crítico (Alerta) */}
        <div className="bg-chestCard/80 border border-white/5 p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-red-500/20 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Stock Bajo</p>
              <h3 className="text-4xl font-black mt-2 text-red-400 tracking-tight">{stats.lowStock}</h3>
            </div>
            <div className="p-3 bg-red-500/10 rounded-xl text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
            </div>
          </div>
          <p className="text-xs text-red-400/80 mt-4">Requieren reabastecimiento urgente</p>
        </div>

        {/* Tarjeta: Movimientos */}
        <div className="bg-chestCard/80 border border-white/5 p-6 rounded-2xl shadow-lg relative overflow-hidden group hover:border-chestAccent/20 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Movimientos hoy</p>
              <h3 className="text-4xl font-black mt-2 tracking-tight">{stats.dailyMovements}</h3>
            </div>
            <div className="p-3 bg-white/5 rounded-xl text-chestAccent">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 3 4 4-4 4" /><path d="M20 7H4" /><path d="m8 21-4-4 4-4" /><path d="M4 17h16" /></svg>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">Entradas y salidas registradas</p>
        </div>

      </main>
      {/* PANEL DE ESTADÍSTICAS: STOCK TURNOVER */}
      <section className="bg-chestCard/80 border border-white/5 p-6 rounded-2xl shadow-xl text-left mt-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Rotación de Stock</h3>
            <p className="text-gray-400 text-xs mt-1">Entrada vs Salida mensuales</p>
          </div>
          {/* Mini icono de tendencia arriba a la derecha */}
          <div className="text-chestAccent">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 7-8.5 8.5-5-5L2 18" /><path d="M16 7h6v6" /></svg>
          </div>
        </div>

        {/* Contenedor Responsivo para la gráfica */}
        <div className="w-full h-[300px] pr-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>

              {/* Cuadrícula de fondo punteada muy sutil */}
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={true} horizontal={true} />

              {/* Ejes X e Y */}
              <XAxis
                dataKey="month"
                stroke="#6b7280"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="#6b7280"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                domain={['0', 'dataMax + 200']} // Esto hace que el tope se estire solo y le sume un margen de 200 para que respire
              />

              {/* Ventana flotante de información interactiva al pasar el mouse */}
              <Tooltip
                contentStyle={{ backgroundColor: '#111c1e', borderColor: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}
                labelStyle={{ color: '#9ca3af', fontWeight: 'bold' }}
              />

              {/* Línea Verde: Productos Ingresados (Inbound) */}
              <Line
                type="monotone"
                dataKey="inbound"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6 }}
              />

              {/* Línea Azul: Productos Sacados (Outbound) */}
              <Line
                type="monotone"
                dataKey="outbound"
                stroke="#3b82f6"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6 }}
              />

            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 3. SECCIÓN DE MONITOREO EN TIEMPO REAL */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

        {/* Columna Izquierda Grande (2/3 de espacio): Alertas de Stock */}
        <div className="lg:col-span-2 bg-chestCard/80 border border-white/5 p-6 rounded-2xl shadow-xl text-left">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold tracking-tight">Alertas de Stock Crítico</h3>
            <span className="px-2.5 py-1 text-xs font-semibold bg-red-500/10 text-red-400 rounded-full">Acción requerida</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-white/5 text-gray-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Producto</th>
                  <th className="pb-3 font-semibold">SKU</th>
                  <th className="pb-3 font-semibold text-center">Stock Actual</th>
                  <th className="pb-3 font-semibold text-right">Mín. Requerido</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {criticalProducts.map((prod) => (
                  <tr key={prod.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 font-medium text-white">{prod.name}</td>
                    <td className="py-3.5 text-gray-400 font-mono text-xs">{prod.sku}</td>
                    <td className="py-3.5 text-center">
                      <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded-md font-bold text-xs">
                        {prod.stock} unids
                      </span>
                    </td>
                    <td className="py-3.5 text-right text-gray-400">{prod.minStock} unids</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Columna Derecha Pequeña (1/3 de espacio): Últimos Movimientos */}
        <div className="bg-chestCard/80 border border-white/5 p-6 rounded-2xl shadow-xl text-left">
          <h3 className="text-lg font-bold tracking-tight mb-4">Movimientos Recientes</h3>

          <div className="space-y-4">
            {recentMovements.map((mov) => (
              <div key={mov.id} className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/10 transition-all">
                {/* Badge dinámico entrada/salida */}
                <div className={`p-2 rounded-lg text-xs font-bold uppercase ${mov.type === 'entrada' ? 'bg-chestAccent/10 text-chestAccent' : 'bg-orange-500/10 text-orange-400'
                  }`}>
                  {mov.type === 'entrada' ? 'IN' : 'OUT'}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white truncate">{mov.product}</h4>
                  <div className="flex justify-between items-center text-xs text-gray-400 mt-1">
                    <span>Cant: <b className="text-gray-200">{mov.qty}</b></span>
                    <span>{mov.user}</span>
                  </div>
                </div>

                <span className="text-[10px] text-gray-500 whitespace-nowrap self-start mt-0.5">{mov.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}