import React from 'react';
import { Waves, Utensils, Dumbbell, Car, Wine, Music } from 'lucide-react';


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
                img="https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
             <ServiceCard 
                icon={Utensils} 
                title="Gastronomía Molecular" 
                desc="Un viaje culinario donde la ciencia y el sabor se encuentran. Menú de 12 pasos."
                img="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
             <ServiceCard 
                icon={Dumbbell} 
                title="Tech Gym" 
                desc="Equipamiento inteligente que se adapta a tu biomecánica en tiempo real."
                img="https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
             <ServiceCard 
                icon={Car} 
                title="Transporte Privado" 
                desc="Flota de vehículos eléctricos de lujo a tu disposición las 24 horas."
                img="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
             <ServiceCard 
                icon={Wine} 
                title="Cava Subterránea" 
                desc="Selección de las mejores etiquetas del mundo en un ambiente íntimo."
                img="https://images.pexels.com/photos/1123260/pexels-photo-1123260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
             <ServiceCard 
                icon={Music} 
                title="Lounge Nocturno" 
                desc="Cócteles de autor y DJs internacionales en nuestra terraza exclusiva."
                img="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            />
        </div>
      </div>
    </div>
  );
}

export default Services;