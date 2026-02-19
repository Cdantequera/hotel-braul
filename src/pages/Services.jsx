import React from 'react';
import { Waves, Utensils, Dumbbell, Car, Wine, Music } from 'lucide-react';
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://back-hotel-braul.onrender.com';

const ServiceCard = ({ icon, title, desc, img }) => {
  const Icon = icon; 

  return (
    <div className="group relative overflow-hidden rounded-xl h-80 border border-white/10 hover:border-[#C5A572] transition-all duration-500">
        <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-6 w-full">
            <div className="h-12 w-12 bg-[#C5A572] rounded-full flex items-center justify-center mb-4 text-black transform group-hover:-translate-y-2 transition-transform duration-300">
                {/* Ahora usamos la variable Icon que definimos arriba */}
                <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                {desc}
            </p>
        </div>
    </div>
  );
};

function Services() {
  return (
    <div className="bg-black min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
            <h5 className="text-[#C5A572] font-bold uppercase tracking-[0.2em] mb-2">Experiencias</h5>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Servicios Premium</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard 
                icon={Waves} 
                title="Spa Futurista" 
                desc="Tratamientos de vanguardia con crioterapia y cámaras de aislamiento sensorial."
                img="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop"
            />
             <ServiceCard 
                icon={Utensils} 
                title="Gastronomía Molecular" 
                desc="Un viaje culinario donde la ciencia y el sabor se encuentran. Menú de 12 pasos."
                img="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
            />
             <ServiceCard 
                icon={Dumbbell} 
                title="Tech Gym" 
                desc="Equipamiento inteligente que se adapta a tu biomecánica en tiempo real."
                img="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
            />
             <ServiceCard 
                icon={Car} 
                title="Transporte Privado" 
                desc="Flota de vehículos eléctricos de lujo a tu disposición las 24 horas."
                img="https://images.unsplash.com/photo-1562426509-5044a121aa49?q=80&w=2070&auto=format&fit=crop"
            />
             <ServiceCard 
                icon={Wine} 
                title="Cava Subterránea" 
                desc="Selección de las mejores etiquetas del mundo en un ambiente íntimo."
                img="https://images.unsplash.com/photo-1569937756447-e19c3b87612f?q=80&w=2070&auto=format&fit=crop"
            />
             <ServiceCard 
                icon={Music} 
                title="Lounge Nocturno" 
                desc="Cócteles de autor y DJs internacionales en nuestra terraza exclusiva."
                img="https://images.unsplash.com/photo-1570575389655-b462c47e814a?q=80&w=2070&auto=format&fit=crop"
            />
        </div>
      </div>
    </div>
  );
}

export default Services;