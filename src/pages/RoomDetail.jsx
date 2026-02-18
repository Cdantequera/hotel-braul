import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Wifi, Tv, Coffee, Wind, Star, ArrowLeft, CheckCircle } from 'lucide-react';

import BookingForm from '../components/booking/BookingForm';
import { createBookingService } from '../services/booking.service';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/v1/rooms/${id}`);
        if (res.data.ok) {
          setRoom(res.data.data || res.data.room); 
        }
      } catch (err) {
        setError('No se pudo cargar la información de la habitación.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  const handleBookingSubmit = async (bookingData) => {
    try {
      const response = await createBookingService(bookingData);
      
      if (response.ok) {
        setBookingSuccess(true);
        setTimeout(() => {
          navigate('/'); 
        }, 3000);
      }
    } catch (err) {
      alert(err.message || "Hubo un error al procesar tu reserva");
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-[#C5A572] text-xl">Cargando detalles...</div>;
  if (error) return <div className="min-h-screen bg-black flex items-center justify-center text-red-500 text-xl">{error}</div>;
  if (!room) return <div className="min-h-screen bg-black flex items-center justify-center text-white text-xl">Habitación no encontrada</div>;

  const icons = [Wifi, Tv, Coffee, Wind];

  return (
    <div className="bg-black min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <Link to="/rooms" className="inline-flex items-center text-[#C5A572] hover:text-white transition-colors mb-8">
          <ArrowLeft className="h-5 w-5 mr-2" /> Volver a habitaciones
        </Link>

        {bookingSuccess ? (
          <div className="bg-zinc-900 border border-[#C5A572] rounded-2xl p-12 text-center shadow-[0_0_30px_rgba(197,165,114,0.2)]">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-serif font-bold text-white mb-4">¡Reserva Confirmada!</h2>
            <p className="text-gray-400 mb-8 text-lg">Tu habitación ha sido reservada con éxito. Ya puedes preparar tus maletas.</p>
            <button 
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-[#C5A572] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-sm"
            >
              Volver al inicio
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <div className="lg:col-span-2 space-y-8">
              <div className="rounded-2xl overflow-hidden h-[400px] md:h-[500px] border border-white/10 relative">
                <img 
                  src={`${backendUrl}/uploads/rooms/${room.image}`} 
                  alt={room.type} 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/800x500?text=Imagen+No+Disponible" }}
                />
              </div>

              <div className="bg-zinc-900 border border-white/5 rounded-2xl p-8">
                <div className="flex justify-between items-start mb-6">
                  <h1 className="text-4xl font-serif font-bold text-white">{room.type}</h1>
                  <div className="flex text-[#C5A572]">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                  </div>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {room.description}
                </p>

                <h3 className="text-xl font-bold text-white mb-4">Servicios Incluidos</h3>
                <div className="flex flex-wrap gap-4">
                  {icons.map((Icon, idx) => (
                    <div key={idx} className="flex items-center bg-black border border-white/10 rounded-full px-4 py-2 text-gray-400">
                      <Icon className="h-5 w-5 mr-2 text-[#C5A572]" />
                      <span className="text-sm">Amenity {idx + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <BookingForm 
                  room={room} 
                  onSubmitBooking={handleBookingSubmit} 
                />
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default RoomDetail;