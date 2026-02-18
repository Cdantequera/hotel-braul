import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Users, Search, ArrowRight, Star, Wifi, Coffee, Waves, Sparkles } from 'lucide-react';

const RoomCard = ({ room, onReserve }) => (
    <div className="block group relative overflow-hidden rounded-xl h-[450px] border border-white/5 hover:border-[#C5A572]/30 transition-colors">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10"></div>
        
        <img 
            src={`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'}/uploads/rooms/${room.image}`} 
            alt={room.type} 
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" 
            onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Imagen+No+Disponible" }}
        />
        
        <div className="absolute bottom-0 left-0 w-full p-6 z-20 bg-linear-to-t from-black via-black/80 to-transparent">
            <h3 className="text-2xl font-serif font-bold text-white mb-2">{room.type}</h3>
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{room.description}</p>
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-xs text-[#C5A572] uppercase tracking-widest mb-1">Desde</p>
                    <p className="text-3xl font-bold text-white">${room.price} <span className="text-sm font-normal text-gray-400">/ noche</span></p>
                </div>
                
                {room.isFeatured && (
                    <div className="absolute top-4 right-4 bg-[#C5A572] text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        Recomendada
                    </div>
                )}
                
                <button 
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onReserve(room._id);
                    }}
                    className="px-4 py-2 bg-transparent border-2 border-[#C5A572] text-[#C5A572] font-bold text-xs uppercase tracking-widest hover:bg-[#C5A572] hover:text-black transition-all duration-300 cursor-pointer"
                >
                    Reservar
                </button>
            </div>
        </div>
    </div>
);

// --- WIDGET DE RESERVAS REPARADO ---
const BookingWidget = () => {
  const navigate = useNavigate();
  // 1. Agregamos estados para guardar las fechas que elige el usuario
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2 Personas');

  // 2. z-50 hace que los inputs estén por encima de todo y se puedan clickear
  const inputStyles = "w-full bg-transparent border-b border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-[#C5A572] py-2 transition-colors text-sm sm:text-base relative z-50";
  const labelStyles = "block text-[#C5A572] text-xs font-bold uppercase tracking-widest mb-1";

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Validaciones básicas de fechas
    if (checkIn && checkOut && new Date(checkIn) >= new Date(checkOut)) {
        alert("La fecha de salida debe ser posterior a la de llegada.");
        return;
    }

    // 3. Enviamos las fechas ocultas en el 'estado' de la navegación hacia la ruta /rooms
    navigate('/rooms', { state: { checkIn, checkOut, guests } });
  };

  // Para bloquear fechas pasadas en el calendario
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-black/60 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl max-w-4xl mx-auto mt-10 transform hover:scale-[1.01] transition-all duration-500 relative z-20">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
        <div className="relative group text-left z-50">
            <label className={labelStyles}>Llegada</label>
            <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <input 
                  type="date" 
                  min={today}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className={inputStyles} 
                  style={{ colorScheme: 'dark' }} // Para que el calendario se vea bien en fondo negro
                />
            </div>
        </div>
        <div className="relative group text-left z-50">
            <label className={labelStyles}>Salida</label>
            <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <input 
                  type="date" 
                  min={checkIn || today}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className={inputStyles} 
                  style={{ colorScheme: 'dark' }}
                />
            </div>
        </div>
        <div className="relative group text-left z-50">
             <label className={labelStyles}>Huéspedes</label>
             <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-2" />
                <select 
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className={`${inputStyles} appearance-none bg-no-repeat cursor-pointer`}
                >
                    <option className="bg-gray-900">2 Personas</option>
                    <option className="bg-gray-900">1 Persona</option>
                    <option className="bg-gray-900">4 Personas</option>
                </select>
             </div>
        </div>
        <button type="submit" className="w-full h-12 bg-linear-to-r from-[#C5A572] to-[#b08d4e] hover:from-[#b08d4e] hover:to-[#C5A572] text-black font-bold uppercase tracking-widest rounded-md shadow-lg transition-all flex items-center justify-center space-x-2 relative z-50 cursor-pointer">
            <Search className="h-5 w-5" />
            <span>Buscar</span>
        </button>
      </form>
    </div>
  );
};

function Home() {
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

  useEffect(() => {
    const fetchRooms = async () => {
        try {
      const res = await axios.get(`${backendUrl}/api/v1/rooms`);
            if (res.data.ok) {
                const allRooms = res.data.data;
                let selected = allRooms.filter(r => r.isFeatured);
                if (selected.length < 3) {
                    const others = allRooms.filter(r => !r.isFeatured);
                    const needed = 3 - selected.length;
                    const filler = others.slice(0, needed);
                    selected = [...selected, ...filler];
                }
                setFeaturedRooms(selected.slice(0, 3));
            }
        } catch (error) {
            console.error("Error fetching rooms for home", error);
        }
    };
    fetchRooms();
  }, );

  const handleReserveClick = (roomId) => {
    let token = localStorage.getItem('token');
    if (!token) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const userObj = JSON.parse(userStr);
          token = userObj?.token || null;
        } catch (error) {(error);}

      }
    }

    if (!token) {
      alert("¡Espera! Para poder reservar necesitas iniciar sesión o registrarte.");
      navigate('/login', { state: { returnTo: `/room/${roomId}` } });
    } else {
      navigate(`/room/${roomId}`);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Hotel View" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/30 to-black"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center pt-20">
          <h5 className="text-[#C5A572] text-sm md:text-base font-bold uppercase tracking-[0.3em] mb-4 drop-shadow-lg">Welcome to the future</h5>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            HOTEL <span className="text-transparent bg-clip-text bg-linear-to-r from-[#C5A572] to-[#E0C185]">BRA'UL</span>
          </h1>
          <p className="text-gray-100 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-md font-medium">
            Donde la arquitectura futurista se encuentra con el confort absoluto.
          </p>
          <BookingWidget />
        </div>
      </section>

      <section className="relative py-20 md:py-32 overflow-hidden bg-black">
        <div className="container mx-auto px-4 relative z-10">
             <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 uppercase tracking-wide">Experiencias <span className="text-[#C5A572]">Únicas</span></h2>
                 <p className="text-gray-400 max-w-xl mx-auto">Redefinimos el lujo con servicios exclusivos.</p>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                 {[
                    { icon: Waves, title: "Infinity Pool", desc: "Vistas al horizonte" },
                    { icon: Sparkles, title: "Spa Futurista", desc: "Rejuvenecimiento total" },
                    { icon: Coffee, title: "Gastronomía", desc: "Sabores del mundo" },
                    { icon: Wifi, title: "Smart Living", desc: "Control total" }
                 ].map((item, idx) => (
                    <Link to="/services" key={idx} className="group p-6 rounded-xl border border-white/10 bg-white/5 hover:border-[#C5A572]/50 hover:bg-white/10 transition-all duration-300 text-center cursor-pointer">
                        <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-[#C5A572]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <item.icon className="h-8 w-8 text-[#C5A572]" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wider">{item.title}</h3>
                        <p className="text-gray-500 text-xs">{item.desc}</p>
                    </Link>
                 ))}
             </div>
          </div>
      </section>

      <section className="relative py-20 md:py-32 bg-zinc-900/30">
        <div className="container mx-auto px-4 relative z-10">
             <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                 <div>
                    <h5 className="text-[#C5A572] font-bold uppercase tracking-[0.2em] mb-2 text-xs md:text-sm">Tu espacio privado</h5>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white uppercase">Nuestras <span className="text-[#C5A572]">Suites</span></h2>
                 </div>
                 <Link to="/rooms" className="hidden md:flex items-center text-[#C5A572] font-bold uppercase tracking-widest hover:text-white transition-colors mt-4 md:mt-0">
                     Ver Todas <ArrowRight className="ml-2 h-5 w-5" />
                 </Link>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {featuredRooms.length > 0 ? (
                     featuredRooms.map(room => (
                         <RoomCard 
                            key={room._id} 
                            room={room} 
                            onReserve={handleReserveClick} 
                         />
                     ))
                 ) : (
                     <div className="col-span-3 text-center py-10">
                        <p className="text-gray-500">Cargando habitaciones exclusivas...</p>
                     </div>
                 )}
             </div>
             
             <div className="md:hidden mt-8 text-center">
                <Link to="/rooms" className="inline-flex items-center text-[#C5A572] font-bold uppercase tracking-widest hover:text-white transition-colors">
                     Ver Todas <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
             </div>
          </div>
      </section>

      <section className="relative py-24 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
             <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop" alt="Atmosphere" className="w-full h-full object-cover opacity-50" />
             <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 text-center px-4">
            <Star className="h-12 w-12 text-[#C5A572] mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 uppercase leading-tight">
                Más que un destino, <br/> un <span className="text-[#C5A572]">estado mental</span>.
            </h2>
            <Link to="/contact" className="inline-block px-10 py-4 bg-transparent border-2 border-[#C5A572] text-[#C5A572] font-bold uppercase tracking-[0.2em] hover:bg-[#C5A572] hover:text-black transition-all duration-300 transform hover:scale-105">
                Comienza tu viaje
            </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;