import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, CalendarDays, Search, Eye, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://back-hotel-braul.onrender.com';

const getToken = () => {
  const token = localStorage.getItem('token');
  if (token) return token;
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try { return JSON.parse(userStr).token || null; } catch (e) {(e) }
  }
  return null;
};

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/v1/bookings`, {
        headers: { Authorization: `Bearer ${getToken()}` },
        withCredentials: true
      });
      if (res.data.ok) {
        // Ordenamos por las más recientes
        const sorted = res.data.bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBookings(sorted);
      }
    } catch (error) {
      console.error(error);
      toast.error('Error al cargar las reservas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'confirmed':  return 'bg-green-900/30 text-green-400';
      case 'pending':    return 'bg-yellow-900/30 text-yellow-400';
      case 'cancelled':  return 'bg-red-900/30 text-red-400';
      default:           return 'bg-gray-900/30 text-gray-400';
    }
  };

  return (
    <div className="text-white space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#C5A572] flex items-center gap-3">
            <CalendarDays className="h-8 w-8" />
            Gestión de Reservas
          </h1>
          <p className="text-gray-400 text-sm mt-1">Administra todas las reservas del hotel</p>
        </div>
        
        {/* Buscador de prueba */}
        <div className="flex items-center bg-zinc-900 border border-gray-700 rounded-lg px-4 py-2 focus-within:border-[#C5A572] transition-colors w-full md:w-auto">
          <Search className="h-4 w-4 text-gray-500" />
          <input type="text" placeholder="Buscar por ID o cliente..." className="bg-transparent border-none focus:ring-0 text-sm text-white ml-2 outline-none w-full" />
        </div>
      </div>

      {/* TABLA DE RESERVAS */}
      <div className="bg-black border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 text-[#C5A572] animate-spin" />
            </div>
          ) : bookings.length === 0 ? (
            <p className="text-center text-gray-500 py-12">No hay reservas registradas.</p>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-zinc-900 text-gray-400 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Huésped</th>
                  <th className="px-6 py-4">Habitación</th>
                  <th className="px-6 py-4">Fechas</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4">Pago</th>
                  <th className="px-6 py-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="px-6 py-4 text-xs text-[#C5A572] font-mono">{b._id.slice(-6).toUpperCase()}</td>
                    <td className="px-6 py-4 text-sm font-medium">{b.user?.name || 'N/A'}<br/><span className="text-xs text-gray-500">{b.user?.email}</span></td>
                    <td className="px-6 py-4 text-sm text-gray-400">Hab. {b.room?.number || '?'}<br/><span className="text-xs text-gray-600">{b.room?.type}</span></td>
                    <td className="px-6 py-4 text-xs text-gray-400">
                      In: {new Date(b.checkIn).toLocaleDateString()}<br/>
                      Out: {new Date(b.checkOut).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${getStatusStyle(b.status)}`}>
                        {b.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-white">
                      ${b.totalPrice?.toLocaleString()}<br/>
                      <span className={`text-[10px] uppercase ${b.paymentStatus === 'paid' ? 'text-green-500' : 'text-yellow-500'}`}>
                        {b.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center space-x-2">
                      <button className="p-2 bg-zinc-800 text-gray-300 hover:text-[#C5A572] rounded transition-colors" title="Ver detalles">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 bg-zinc-800 text-gray-300 hover:text-red-500 rounded transition-colors" title="Cancelar reserva">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;