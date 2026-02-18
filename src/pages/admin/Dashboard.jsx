import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  BedDouble, 
  CalendarCheck, 
  LogOut, 
  Clock 
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    activeBookings: 12, // Simulado
    todayCheckIns: 4,   // Simulado
    todayCheckOuts: 3,  // Simulado
    occupancy: 65,      // Simulado
    revenue: 12500      // Simulado
  });
  
  const [recentBookings, setRecentBookings] = useState([]);

  // Cargar datos REALES de habitaciones
  useEffect(() => {
    const fetchRealData = async () => {
      try {
        const roomRes = await axios.get('http://localhost:4000/api/v1/rooms');
        if (roomRes.data.ok) {
            setStats(prev => ({ ...prev, totalRooms: roomRes.data.data.length }));
        }
        
        // Aquí simulamos reservas recientes (esto vendrá de tu API pronto)
        setRecentBookings([
            { id: "RES-001", guest: "Carlos Gardel", room: "101", status: "Confirmado", amount: 450 },
            { id: "RES-002", guest: "Lionel Messi", room: "205", status: "Check-in", amount: 1200 },
            { id: "RES-003", guest: "Marta Minujín", room: "104", status: "Pendiente", amount: 320 },
        ]);

      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchRealData();
  }, []);

  // Componente de Tarjeta KPI
  const KpiCard = ({ title, value, subtext, icon: Icon, trend }) => (
    <div className="bg-black border border-white/10 p-6 rounded-xl hover:border-[#C5A572]/50 transition-all duration-300 group">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-zinc-900 rounded-lg text-[#C5A572] group-hover:bg-[#C5A572] group-hover:text-black transition-colors">
                <Icon className="h-6 w-6" />
            </div>
            {trend && (
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                    {trend > 0 ? '+' : ''}{trend}%
                </span>
            )}
        </div>
        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-serif font-bold text-white mt-1">{value}</p>
        <p className="text-xs text-gray-500 mt-2">{subtext}</p>
    </div>
  );

  return (
    <div className="space-y-6">
        
        {/* TITULO Y SALUDO */}
        <div className="flex justify-between items-end">
            <div>
                <h2 className="text-3xl font-serif font-bold text-white">Dashboard Operativo</h2>
                <p className="text-gray-400">Resumen en tiempo real del Hotel Bra'ul</p>
            </div>
            <div className="text-right">
                <p className="text-[#C5A572] font-bold text-lg">{new Date().toLocaleDateString()}</p>
            </div>
        </div>

        {/* 1. FILA SUPERIOR: KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard 
                title="Ocupación" 
                value={`${stats.occupancy}%`} 
                subtext={`${stats.activeBookings} de ${stats.totalRooms} habitaciones`}
                icon={TrendingUp}
                trend={5}
            />
            <KpiCard 
                title="ADR (Tarifa Prom.)" 
                value="$185" 
                subtext="Promedio por noche hoy"
                icon={DollarSign}
                trend={12}
            />
             <KpiCard 
                title="Check-ins Hoy" 
                value={stats.todayCheckIns} 
                subtext="2 Pendientes de llegada"
                icon={CalendarCheck}
            />
             <KpiCard 
                title="Habitaciones" 
                value={stats.totalRooms} 
                subtext="Inventario total activo"
                icon={BedDouble}
            />
        </div>

        {/* 2. FILA CENTRAL: Operatividad y Estado */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Estado de Limpieza (Housekeeping) */}
            <div className="lg:col-span-2 bg-black border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-white text-lg">Estado de Habitaciones</h3>
                    <button className="text-xs text-[#C5A572] hover:underline">Ver reporte completo</button>
                </div>
                
                {/* Barras de estado visuales */}
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Limpias (Listas para venta)</span>
                            <span className="text-green-400 font-bold">12 Habs</span>
                        </div>
                        <div className="w-full bg-zinc-800 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Sucias (Check-out reciente)</span>
                            <span className="text-red-400 font-bold">5 Habs</span>
                        </div>
                        <div className="w-full bg-zinc-800 rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Mantenimiento</span>
                            <span className="text-yellow-400 font-bold">3 Habs</span>
                        </div>
                        <div className="w-full bg-zinc-800 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex space-x-4">
                     <button className="flex-1 bg-zinc-900 border border-gray-700 text-gray-300 py-2 rounded text-sm hover:border-[#C5A572] transition-colors">Solicitar Limpieza</button>
                     <button className="flex-1 bg-zinc-900 border border-gray-700 text-gray-300 py-2 rounded text-sm hover:border-red-500 transition-colors">Reportar Avería</button>
                </div>
            </div>

            {/* Actividad Reciente (Mini Feed) */}
            <div className="bg-black border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-white text-lg mb-4">Actividad en Tiempo Real</h3>
                <div className="space-y-4">
                    {[
                        { icon: LogOut, text: "Check-out: Hab 204", time: "Hace 10 min", color: "text-blue-400" },
                        { icon: CalendarCheck, text: "Nueva Reserva: Booking.com", time: "Hace 32 min", color: "text-green-400" },
                        { icon: Users, text: "Solicitud Room Service: Hab 101", time: "Hace 1 hora", color: "text-yellow-400" },
                        { icon: Clock, text: "Turno limpieza finalizado", time: "Hace 2 horas", color: "text-gray-400" },
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-start space-x-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                            <item.icon className={`h-5 w-5 ${item.color} mt-0.5`} />
                            <div>
                                <p className="text-sm text-gray-200">{item.text}</p>
                                <p className="text-xs text-gray-500">{item.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* 3. FILA INFERIOR: Tabla de Reservas Recientes */}
        <div className="bg-black border border-white/10 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="font-bold text-white text-lg">Últimas Reservas</h3>
                <button className="text-sm bg-[#C5A572] text-black px-4 py-2 rounded font-bold hover:bg-white transition-colors">Nueva Reserva</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-zinc-900 text-gray-400 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Huésped</th>
                            <th className="px-6 py-4">Habitación</th>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {recentBookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-zinc-900/50 transition-colors">
                                <td className="px-6 py-4 text-sm text-[#C5A572] font-mono">{booking.id}</td>
                                <td className="px-6 py-4 text-sm text-white font-medium">{booking.guest}</td>
                                <td className="px-6 py-4 text-sm text-gray-400">Hab {booking.room}</td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                        booking.status === 'Confirmado' ? 'bg-green-900/30 text-green-400' :
                                        booking.status === 'Pendiente' ? 'bg-yellow-900/30 text-yellow-400' :
                                        'bg-blue-900/30 text-blue-400'
                                    }`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-white text-right font-bold">${booking.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    </div>
  );
};

export default Dashboard;