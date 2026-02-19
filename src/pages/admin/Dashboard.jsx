import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  BedDouble, 
  CalendarCheck, 
  LogOut, 
  Clock,
  Loader2
} from 'lucide-react';



const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://back-hotel-braul.onrender.com';

const getToken = () => {
  const token = localStorage.getItem('token');
  if (token) return token;
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try { return JSON.parse(userStr).token || null; } catch (e) {(e)}
  }
  return null;
};

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
  withCredentials: true
});

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRooms: 0,
    activeBookings: 0,
    pendingBookings: 0,
    totalRevenue: 0,
    occupancy: 0,
  });
  
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Llamadas en paralelo: habitaciones + todas las reservas
      const [roomRes, bookingRes] = await Promise.all([
        axios.get(`${backendUrl}/api/v1/rooms`),
        axios.get(`${backendUrl}/api/v1/bookings`, authHeaders())
      ]);

      const rooms = roomRes.data.ok ? roomRes.data.data : [];
      const bookings = bookingRes.data.ok ? bookingRes.data.bookings : [];

      // Calcular stats reales
      const totalRooms = rooms.length;
      const activeBookings = bookings.filter(b => b.status === 'confirmed').length;
      const pendingBookings = bookings.filter(b => b.status === 'pending').length;
      const totalRevenue = bookings
        .filter(b => b.paymentStatus === 'paid')
        .reduce((sum, b) => sum + b.totalPrice, 0);
      const occupancy = totalRooms > 0 ? Math.round((activeBookings / totalRooms) * 100) : 0;

      setStats({ totalRooms, activeBookings, pendingBookings, totalRevenue, occupancy });

      // Últimas 5 reservas por fecha de creación
      const sorted = [...bookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRecentBookings(sorted.slice(0, 5));

    } catch (error) {
      console.error("Error fetching dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'confirmed':  return { label: 'Confirmado', cls: 'bg-green-900/30 text-green-400' };
      case 'pending':    return { label: 'Pendiente',  cls: 'bg-yellow-900/30 text-yellow-400' };
      case 'cancelled':  return { label: 'Cancelado',  cls: 'bg-red-900/30 text-red-400' };
      case 'completed':  return { label: 'Completado', cls: 'bg-blue-900/30 text-blue-400' };
      default:           return { label: status,       cls: 'bg-gray-900/30 text-gray-400' };
    }
  };

  const KpiCard = ({ title, value, subtext, icon: Icon }) => (
    <div className="bg-black border border-white/10 p-6 rounded-xl hover:border-[#C5A572]/50 transition-all duration-300 group">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-zinc-900 rounded-lg text-[#C5A572] group-hover:bg-[#C5A572] group-hover:text-black transition-colors">
                <Icon className="h-6 w-6" />
            </div>
        </div>
        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-serif font-bold text-white mt-1">{value}</p>
        <p className="text-xs text-gray-500 mt-2">{subtext}</p>
    </div>
  );

  return (
    <div className="space-y-6">
        
        {/* TITULO Y BOTÓN ACTUALIZAR */}
        <div className="flex justify-between items-end">
            <div>
                <h2 className="text-3xl font-serif font-bold text-white">Dashboard Operativo</h2>
                <p className="text-gray-400">Resumen en tiempo real del Hotel Bra'ul</p>
            </div>
            <div className="flex items-center gap-4">
                <p className="text-[#C5A572] font-bold text-lg">{new Date().toLocaleDateString()}</p>
                <button
                    onClick={fetchDashboardData}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/10 text-gray-300 text-sm rounded-lg hover:border-[#C5A572] transition-colors disabled:opacity-50"
                >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <TrendingUp className="h-4 w-4" />}
                    Actualizar
                </button>
            </div>
        </div>

        {/* 1. KPIs REALES */}
        {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-black border border-white/10 p-6 rounded-xl animate-pulse h-36" />
                ))}
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard 
                    title="Ocupación" 
                    value={`${stats.occupancy}%`} 
                    subtext={`${stats.activeBookings} de ${stats.totalRooms} habitaciones activas`}
                    icon={TrendingUp}
                />
                <KpiCard 
                    title="Ingresos Cobrados" 
                    value={`$${stats.totalRevenue.toLocaleString()}`}
                    subtext="Reservas con pago confirmado"
                    icon={DollarSign}
                />
                <KpiCard 
                    title="Reservas Pendientes" 
                    value={stats.pendingBookings} 
                    subtext="Esperando confirmación de pago"
                    icon={CalendarCheck}
                />
                <KpiCard 
                    title="Habitaciones" 
                    value={stats.totalRooms} 
                    subtext="Inventario total activo"
                    icon={BedDouble}
                />
            </div>
        )}

        {/* 2. BARRAS DE ESTADO + ACTIVIDAD RECIENTE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 bg-black border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-white text-lg">Estado de Habitaciones</h3>
                </div>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Confirmadas (Ocupadas)</span>
                            <span className="text-green-400 font-bold">{stats.activeBookings} Reservas</span>
                        </div>
                        <div className="w-full bg-zinc-800 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full transition-all duration-700" style={{ width: `${stats.occupancy}%` }}></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Pendientes de pago</span>
                            <span className="text-yellow-400 font-bold">{stats.pendingBookings} Reservas</span>
                        </div>
                        <div className="w-full bg-zinc-800 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full transition-all duration-700"
                                style={{ width: stats.totalRooms > 0 ? `${Math.round((stats.pendingBookings / stats.totalRooms) * 100)}%` : '0%' }}>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Disponibles</span>
                            <span className="text-blue-400 font-bold">
                                {Math.max(0, stats.totalRooms - stats.activeBookings - stats.pendingBookings)} Habs
                            </span>
                        </div>
                        <div className="w-full bg-zinc-800 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full transition-all duration-700"
                                style={{ width: stats.totalRooms > 0 
                                    ? `${Math.round((Math.max(0, stats.totalRooms - stats.activeBookings - stats.pendingBookings) / stats.totalRooms) * 100)}%` 
                                    : '0%' }}>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex space-x-4">
                     <button className="flex-1 bg-zinc-900 border border-gray-700 text-gray-300 py-2 rounded text-sm hover:border-[#C5A572] transition-colors">Solicitar Limpieza</button>
                     <button className="flex-1 bg-zinc-900 border border-gray-700 text-gray-300 py-2 rounded text-sm hover:border-red-500 transition-colors">Reportar Avería</button>
                </div>
            </div>

            {/* Actividad reciente con datos reales */}
            <div className="bg-black border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-white text-lg mb-4">Actividad Reciente</h3>
                <div className="space-y-4">
                    {loading ? (
                        <div className="animate-pulse space-y-3">
                            {[...Array(4)].map((_, i) => <div key={i} className="h-10 bg-zinc-900 rounded" />)}
                        </div>
                    ) : recentBookings.length === 0 ? (
                        <p className="text-gray-600 text-sm text-center py-4">Sin actividad reciente</p>
                    ) : recentBookings.slice(0, 4).map((booking, idx) => {
                        const { label, cls } = getStatusStyle(booking.status);
                        return (
                            <div key={idx} className="flex items-start space-x-3 border-b border-white/5 pb-3 last:border-0 last:pb-0">
                                <CalendarCheck className="h-5 w-5 text-[#C5A572] mt-0.5 shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-sm text-gray-200 truncate">
                                        {booking.user?.name || 'Usuario'} — Hab {booking.room?.number || '—'}
                                    </p>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cls}`}>{label}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

        {/* 3. TABLA DE RESERVAS REALES */}
        <div className="bg-black border border-white/10 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="font-bold text-white text-lg">Últimas Reservas</h3>
                <button 
                    onClick={fetchDashboardData}
                    disabled={loading}
                    className="text-sm bg-[#C5A572] text-black px-4 py-2 rounded font-bold hover:bg-white transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    Actualizar
                </button>
            </div>
            <div className="overflow-x-auto">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 text-[#C5A572] animate-spin" />
                    </div>
                ) : recentBookings.length === 0 ? (
                    <p className="text-center text-gray-500 py-12">No hay reservas registradas aún.</p>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-zinc-900 text-gray-400 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Huésped</th>
                                <th className="px-6 py-4">Habitación</th>
                                <th className="px-6 py-4">Check-in</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4">Pago</th>
                                <th className="px-6 py-4 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {recentBookings.map((booking) => {
                                const { label, cls } = getStatusStyle(booking.status);
                                return (
                                    <tr key={booking._id} className="hover:bg-zinc-900/50 transition-colors">
                                        <td className="px-6 py-4 text-xs text-[#C5A572] font-mono">
                                            {booking._id.slice(-6).toUpperCase()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-white font-medium">
                                            {booking.user?.name || '—'}
                                            <p className="text-xs text-gray-500">{booking.user?.email || ''}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-400">
                                            Hab {booking.room?.number || '—'}
                                            <p className="text-xs text-gray-600">{booking.room?.type || ''}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-400">
                                            {new Date(booking.checkIn).toLocaleDateString('es-ES')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${cls}`}>
                                                {label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                                booking.paymentStatus === 'paid' 
                                                    ? 'bg-green-900/30 text-green-400' 
                                                    : 'bg-gray-900/30 text-gray-400'
                                            }`}>
                                                {booking.paymentStatus === 'paid' ? 'Pagado' : 'Pendiente'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-white text-right font-bold">
                                            ${booking.totalPrice?.toLocaleString()}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>

    </div>
  );
};

export default Dashboard;