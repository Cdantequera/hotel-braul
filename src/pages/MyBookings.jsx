import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, CreditCard, CheckCircle, Clock, XCircle, Loader2 } from 'lucide-react';
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { getUserBookingsService } from '../services/booking.service'; 

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://back-hotel-braul.onrender.com';

initMercadoPago('APP_USR-e9eac3e8-d9c6-4088-beff-e585db30a0da', {
  locale: 'es-AR'
});

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [preferenceIds, setPreferenceIds] = useState({}); 
  const [payingBookingId, setPayingBookingId] = useState(null);

  const navigate = useNavigate();

  const getToken = () => {
    const token = localStorage.getItem('token');
    if (token) return token;
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        return userObj.token || null;
      } catch (error) { console.error(error); }
    }
    
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await getUserBookingsService();
        if (response.ok) {
          setBookings(response.bookings);
        }
      } catch (error) {
        setError('No pudimos cargar tus reservas.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, );

  const handlePayment = async (booking) => {
    setPayingBookingId(booking._id);
    try {
      const token = getToken();
      
      const response = await axios.post(
        `${backendUrl}/api/v1/payments/create_preference`, 
        { bookingId: booking._id },
        { 
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
      );

      if (response.data.ok) {
        setPreferenceIds(prev => ({
          ...prev,
          [booking._id]: response.data.preferenceId
        }));
      }
    } catch (err) {
      console.error("Error al generar el pago:", err);
      alert(err.response?.data?.message || "Error al conectar con Mercado Pago");
    } finally {
      setPayingBookingId(null);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="flex items-center text-green-500 bg-green-500/10 px-3 py-1 rounded-full text-xs uppercase tracking-wider font-bold"><CheckCircle className="w-4 h-4 mr-1" /> Confirmada</span>;
      case 'pending':
        return <span className="flex items-center text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full text-xs uppercase tracking-wider font-bold"><Clock className="w-4 h-4 mr-1" /> Pendiente</span>;
      case 'cancelled':
        return <span className="flex items-center text-red-500 bg-red-500/10 px-3 py-1 rounded-full text-xs uppercase tracking-wider font-bold"><XCircle className="w-4 h-4 mr-1" /> Cancelada</span>;
      default: return null;
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-[#C5A572] text-xl">Cargando...</div>;

  return (
    <div className="bg-black min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-4xl font-serif font-bold text-white mb-12 uppercase tracking-widest">Mis Reservas</h1>

        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden flex flex-col md:flex-row hover:border-[#C5A572]/30 transition-all">
              
              <div className="w-full md:w-1/3 h-48 md:h-auto relative">
                <img 
                  src={`${backendUrl}/uploads/rooms/${booking.room?.image}`} 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Habitacion" }}
                />
              </div>

              <div className="p-8 w-full md:w-2/3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-serif font-bold text-white uppercase tracking-wider">{booking.room?.type}</h3>
                    {getStatusBadge(booking.status)}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-black/40 p-3 rounded border border-white/5">
                      <p className="text-[10px] text-[#C5A572] uppercase tracking-widest mb-1">Entrada</p>
                      <p className="text-white text-sm">{formatDate(booking.checkIn)}</p>
                    </div>
                    <div className="bg-black/40 p-3 rounded border border-white/5">
                      <p className="text-[10px] text-[#C5A572] uppercase tracking-widest mb-1">Salida</p>
                      <p className="text-white text-sm">{formatDate(booking.checkOut)}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col border-t border-white/10 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-[#C5A572]">
                      <CreditCard className="w-5 h-5 mr-3" />
                      <span className="text-2xl font-bold font-serif">${booking.totalPrice}</span>
                    </div>

                    <div className="flex gap-3">
                      {booking.status === 'confirmed' && booking.paymentStatus !== 'paid' && !preferenceIds[booking._id] && (
                        <button 
                          onClick={() => handlePayment(booking)}
                          disabled={payingBookingId === booking._id}
                          className="px-8 py-2 bg-[#C5A572] text-black font-bold uppercase tracking-widest hover:bg-white transition-all text-xs"
                        >
                          {payingBookingId === booking._id ? 'Generando...' : 'Pagar Reserva'}
                        </button>
                      )}
                      
                      {booking.paymentStatus === 'paid' && (
                        <span className="px-6 py-2 bg-green-500/10 text-green-500 border border-green-500/20 text-xs font-bold uppercase tracking-widest rounded">Pagado</span>
                      )}
                    </div>
                  </div>

                  {preferenceIds[booking._id] && (
                    <div className="mt-4 bg-white/5 p-4 rounded-lg">
                      <Wallet 
                        initialization={{ preferenceId: preferenceIds[booking._id] }} 
                        customization={{ texts: { valueProp: 'smart_option' } }} 
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;