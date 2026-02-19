import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import useSiteConfig from '../../hook/useSiteConfig';

const Footer = () => {
  const { config } = useSiteConfig();

  return (
    <footer className="bg-black border-t border-[#C5A572]/30 pt-16 pb-8 mt-auto z-10 relative">
      <div className="container mx-auto px-4">
        
        {/* --- GRID PRINCIPAL (4 Columnas) --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* COLUMNA 1: MARCA */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-white uppercase tracking-widest">
              HOTEL <span className="text-[#C5A572]">BRA'UL</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Donde el lujo futurista se encuentra con la serenidad absoluta. Una experiencia inolvidable en cada estancia.
            </p>
          </div>

          {/* COLUMNA 2: ENLACES RÁPIDOS */}
          <div>
            <h4 className="text-[#C5A572] font-bold uppercase tracking-widest text-xs mb-6">Explorar</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-[#C5A572] transition-colors text-sm">Inicio</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-[#C5A572] transition-colors text-sm">Sobre Nosotros</Link></li>
              <li><Link to="/rooms" className="text-gray-400 hover:text-[#C5A572] transition-colors text-sm">Habitaciones</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-[#C5A572] transition-colors text-sm">Servicios</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-[#C5A572] transition-colors text-sm">Contacto</Link></li>
            </ul>
          </div>

          {/* COLUMNA 3: CONTACTO — datos dinámicos del backend */}
          <div>
            <h4 className="text-[#C5A572] font-bold uppercase tracking-widest text-xs mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400 text-sm">
                <MapPin className="h-5 w-5 text-[#C5A572] shrink-0" />
                <span>Av. Francisco de Aguirre esquina Muñecas, Tucuman, Argentina</span>
              </li>
              {config.phone && (
                <li className="flex items-center space-x-3 text-gray-400 text-sm">
                  <Phone className="h-5 w-5 text-[#C5A572] shrink-0" />
                  <span>{config.phone}</span>
                </li>
              )}
              {config.email && (
                <li className="flex items-center space-x-3 text-gray-400 text-sm">
                  <Mail className="h-5 w-5 text-[#C5A572] shrink-0" />
                  <span>{config.email}</span>
                </li>
              )}
            </ul>
          </div>

          {/* COLUMNA 4: SOCIAL — solo muestra íconos si hay URL cargada */}
          <div>
            <h4 className="text-[#C5A572] font-bold uppercase tracking-widest text-xs mb-6">Síguenos</h4>
            <div className="flex space-x-4">
              {config.facebook && (
                <a href={config.facebook} target="_blank" rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full border border-gray-800 bg-gray-900 flex items-center justify-center text-gray-400 hover:border-[#C5A572] hover:text-[#C5A572] hover:scale-110 transition-all duration-300">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {config.instagram && (
                <a href={config.instagram} target="_blank" rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full border border-gray-800 bg-gray-900 flex items-center justify-center text-gray-400 hover:border-[#C5A572] hover:text-[#C5A572] hover:scale-110 transition-all duration-300">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {config.twitter && (
                <a href={config.twitter} target="_blank" rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full border border-gray-800 bg-gray-900 flex items-center justify-center text-gray-400 hover:border-[#C5A572] hover:text-[#C5A572] hover:scale-110 transition-all duration-300">
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {/* Si no hay ninguna red cargada, mostramos mensaje sutil */}
              {!config.facebook && !config.instagram && !config.twitter && (
                <p className="text-gray-600 text-xs italic">Próximamente</p>
              )}
            </div>
          </div>
        </div>

        {/* --- BARRA INFERIOR (Copyright) --- */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Hotel Bra'ul Resort. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-xs text-gray-600 hover:text-[#C5A572] transition-colors">Política de Privacidad</a>
            <a href="#" className="text-xs text-gray-600 hover:text-[#C5A572] transition-colors">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;