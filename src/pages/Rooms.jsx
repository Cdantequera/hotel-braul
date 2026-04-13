import React, { useState, useEffect } from "react";
import { Wifi, Tv, Coffee, Wind, Star, Calendar, AlertCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://back-hotel-braul.onrender.com";

const RoomItem = ({ room, onReserve }) => {
  const icons = [Wifi, Tv, Coffee, Wind];

  return (
    <div className="group relative bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden hover:border-[#C5A572]/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(197,165,114,0.15)] flex flex-col md:flex-row h-auto md:h-[400px]">
      <div className="w-full md:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10"></div>
        <img
          src={room.image}
          alt={room.type}
          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='16' fill='%23C5A572' text-anchor='middle' dy='.3em'%3EImagen no disponible%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>

      <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-3xl font-serif font-bold text-white">{room.type}</h3>
            <div className="flex text-[#C5A572]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
          </div>
          <p className="text-gray-400 mb-6 leading-relaxed line-clamp-3">{room.description}</p>

          <div className="flex flex-wrap gap-4 mb-8">
            {icons.map((Icon, idx) => (
              <div
                key={idx}
                className="h-10 w-10 rounded-full bg-black border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-[#C5A572] group-hover:border-[#C5A572] transition-colors"
              >
                <Icon className="h-5 w-5" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-white/10 pt-6">
          <div>
            <p className="text-xs text-[#C5A572] uppercase tracking-widest">Precio por noche</p>
            <p className="text-3xl font-bold text-white">${room.price}</p>
          </div>
          <button
            onClick={() => onReserve(room._id)}
            className="px-8 py-3 bg-[#C5A572] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-sm cursor-pointer"
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const searchState = location.state || {};
  const { checkIn, checkOut, guests } = searchState;

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      setError(null);
      try {
        // Construir URL de forma segura usando URLSearchParams
        const params = new URLSearchParams();
        if (checkIn) params.append("checkIn", checkIn);
        if (checkOut) params.append("checkOut", checkOut);

        let url = `${backendUrl}/api/v1/rooms`;
        const queryString = params.toString();
        if (queryString) url += `?${queryString}`;

        const res = await axios.get(url);
        if (res.data.ok) {
          setRooms(res.data.data);
        } else {
          throw new Error(res.data.message || "Error al obtener habitaciones");
        }
      } catch (err) {
        console.error("❌ Error fetching rooms:", err);
        setError(err.response?.data?.message || err.message || "Error de conexión con el servidor");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [checkIn, checkOut]);

  const handleReserveClick = (roomId) => {
    let token = localStorage.getItem("token");
    if (!token) {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const userObj = JSON.parse(userStr);
          token = userObj.token;
        } catch (error) {
          error;
        }
      }
    }

    if (!token) {
      alert("¡Espera! Para poder reservar necesitas iniciar sesión o registrarte.");
      navigate("/login");
    } else {
      navigate(`/room/${roomId}`);
    }
  };

  return (
    <div className="bg-black min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h5 className="text-[#C5A572] font-bold uppercase tracking-[0.2em] mb-2">
            Refugio Exclusivo
          </h5>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Nuestras Habitaciones
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Diseñadas meticulosamente para ofrecer el máximo confort y privacidad.
          </p>
        </div>

        {checkIn && checkOut && (
          <div className="bg-[#C5A572]/10 border border-[#C5A572] p-4 rounded-lg max-w-3xl mx-auto mb-12 text-center flex flex-col md:flex-row justify-center items-center gap-3 shadow-[0_0_20px_rgba(197,165,114,0.15)]">
            <Calendar className="text-[#C5A572] h-6 w-6" />
            <p className="text-white text-sm md:text-base">
              Mostrando habitaciones disponibles del{" "}
              <span className="font-bold text-[#C5A572]">{checkIn}</span> al{" "}
              <span className="font-bold text-[#C5A572]">{checkOut}</span>
              {guests && ` para ${guests}`}
            </p>
          </div>
        )}

        <div className="space-y-12">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#C5A572] border-r-transparent"></div>
              <p className="text-[#C5A572] text-xl font-serif mt-4">Cargando catálogo...</p>
            </div>
          ) : error ? (
            <div className="bg-red-900/20 border border-red-500/50 rounded-2xl p-8 text-center max-w-2xl mx-auto">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Error al cargar habitaciones</h3>
              <p className="text-gray-400 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
              >
                Reintentar
              </button>
            </div>
          ) : rooms.length > 0 ? (
            rooms.map((room) => (
              <RoomItem key={room._id} room={room} onReserve={handleReserveClick} />
            ))
          ) : (
            <div className="text-center py-20 bg-zinc-900 border border-white/5 rounded-2xl">
              <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl text-white font-serif mb-2">No hay disponibilidad</h3>
              <p className="text-gray-400">
                Lo sentimos, no tenemos habitaciones libres para estas fechas.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Rooms;
