import React from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import useSiteConfig from '../hook/useSiteConfig';

function Contact() {
  const { config, loading } = useSiteConfig();

  return (
    <div className="bg-black min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
            <h5 className="text-[#C5A572] font-bold uppercase tracking-[0.2em] mb-2">Estamos para ti</h5>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Contáctanos</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* FORMULARIO */}
            <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">Envíanos un mensaje</h3>
                <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <input type="text" placeholder="Nombre" className="bg-black border border-gray-700 text-white p-4 rounded-md focus:border-[#C5A572] focus:outline-none w-full" />
                        <input type="text" placeholder="Apellido" className="bg-black border border-gray-700 text-white p-4 rounded-md focus:border-[#C5A572] focus:outline-none w-full" />
                    </div>
                    <input type="email" placeholder="Correo Electrónico" className="bg-black border border-gray-700 text-white p-4 rounded-md focus:border-[#C5A572] focus:outline-none w-full" />
                    <textarea rows="5" placeholder="¿En qué podemos ayudarte?" className="bg-black border border-gray-700 text-white p-4 rounded-md focus:border-[#C5A572] focus:outline-none w-full"></textarea>
                    
                    <button type="button" className="w-full py-4 bg-linear-to-r from-[#C5A572] to-[#b08d4e] text-black font-bold uppercase tracking-widest rounded-md hover:shadow-[0_0_20px_rgba(197,165,114,0.4)] transition-all flex items-center justify-center space-x-2">
                        <span>Enviar Mensaje</span>
                        <Send className="h-5 w-5" />
                    </button>
                </form>
            </div>

            {/* INFO + MAPA */}
            <div className="space-y-8">
                {/* Info Cards — datos dinámicos del backend */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-zinc-900 p-6 rounded-xl border border-white/5 flex items-start space-x-4">
                        <MapPin className="h-6 w-6 text-[#C5A572] shrink-0" />
                        <div>
                            <h4 className="text-white font-bold uppercase text-sm mb-1">Ubicación</h4>
                            <p className="text-gray-400 text-sm">Av. Francisco de Aguirre esquina Muñecas, Tucumán, Argentina</p>
                        </div>
                    </div>

                    {/* Teléfono — solo si hay dato */}
                    <div className="bg-zinc-900 p-6 rounded-xl border border-white/5 flex items-start space-x-4">
                        <Phone className="h-6 w-6 text-[#C5A572] shrink-0" />
                        <div>
                            <h4 className="text-white font-bold uppercase text-sm mb-1">Teléfono</h4>
                            <p className="text-gray-400 text-sm">
                                {loading ? '...' : config.phone || '+54 38166088441'}
                            </p>
                        </div>
                    </div>

                    {/* Email — solo si hay dato */}
                    <div className="bg-zinc-900 p-6 rounded-xl border border-white/5 flex items-start space-x-4">
                        <Mail className="h-6 w-6 text-[#C5A572] shrink-0" />
                        <div>
                            <h4 className="text-white font-bold uppercase text-sm mb-1">Email</h4>
                            <p className="text-gray-400 text-sm">
                                {loading ? '...' : config.email || 'reservas@hotelbraul.com'}
                            </p>
                        </div>
                    </div>

                    {/* WhatsApp — aparece solo si está cargado en el admin */}
                    {!loading && config.whatsapp && (
                        <a
                            href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-zinc-900 p-6 rounded-xl border border-white/5 flex items-start space-x-4 hover:border-green-500/40 transition-colors group"
                        >
                            <MessageCircle className="h-6 w-6 text-[#C5A572] group-hover:text-green-400 shrink-0 transition-colors" />
                            <div>
                                <h4 className="text-white font-bold uppercase text-sm mb-1">WhatsApp</h4>
                                <p className="text-gray-400 text-sm">{config.whatsapp}</p>
                            </div>
                        </a>
                    )}

                    <div className="bg-zinc-900 p-6 rounded-xl border border-white/5 flex items-start space-x-4">
                        <Clock className="h-6 w-6 text-[#C5A572] shrink-0" />
                        <div>
                            <h4 className="text-white font-bold uppercase text-sm mb-1">Recepción</h4>
                            <p className="text-gray-400 text-sm">Disponible 24/7</p>
                        </div>
                    </div>
                </div>

                {/* --- MAPA --- */}
                <div className="w-full h-80 rounded-2xl overflow-hidden border border-[#C5A572]/30 shadow-2xl relative group">
                    <div className="absolute inset-0 border-4 border-[#C5A572]/0 group-hover:border-[#C5A572]/20 transition-all pointer-events-none z-10"></div>
                    <iframe 
                        title="Hotel Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.106066601445!2d-65.2071853849566!3d-26.83658598316049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659bcfbc!2sSan%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses!2sar!4v1645564856231!5m2!1ses!2sar" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }}
                        allowFullScreen="" 
                        loading="lazy"
                    ></iframe>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;