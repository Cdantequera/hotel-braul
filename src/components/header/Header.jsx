import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User } from 'lucide-react'; 
import axios from 'axios';
import logoHotel from '../../assets/logo-braul.png'; 

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token"); 

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error lectura usuario:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } else {
        setUser(null);
    }
  }, [location]); 

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : ''
        },
        withCredentials: true 
      };

      await axios.post(`${backendUrl}/api/v1/auth/logout`, {}, config);
    } catch (error) {
      console.error("Error logout:", error);
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("token"); 
      
      setUser(null);
      navigate("/login");
      setIsOpen(false);
    }
  };

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Habitaciones', path: '/rooms' },   
    { name: 'Servicios', path: '/services' },   
    { name: 'Contacto', path: '/contact' },     
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 border-b ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-xl border-yellow-600/40 py-2 shadow-lg shadow-black/50' 
          : 'bg-transparent backdrop-blur-none border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <Link to="/" className="flex items-center space-x-4 group">
            <div className={`relative rounded-full border-2 border-[#C5A572] shadow-[0_0_20px_rgba(197,165,114,0.3)] transition-all duration-500 flex items-center justify-center bg-black/50 ${scrolled ? 'h-12 w-12' : 'h-16 w-16'}`}>
               <img 
                 src={logoHotel} 
                 alt="Hotel Bra'ul Logo" 
                 className="h-full w-full object-cover rounded-full scale-110" 
               />
            </div>

            <div className="flex flex-col">
              <span className={`font-serif font-bold tracking-widest uppercase text-white leading-none transition-all duration-500 ${scrolled ? 'text-xl' : 'text-2xl'} drop-shadow-lg`}>
                HOTEL <span className="text-[#C5A572]">BRA'UL</span>
              </span>
              <span className="text-[0.65rem] font-sans font-medium tracking-[0.4em] text-gray-300 uppercase mt-1 ml-1 drop-shadow-md">
                Resort & Spa
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
               const isActive = location.pathname === item.path;
               return (
              <Link key={item.name} to={item.path} className={`relative text-xs font-bold tracking-widest uppercase transition-colors duration-300 group py-2 drop-shadow-md ${isActive ? 'text-[#C5A572]' : 'text-gray-200 hover:text-[#C5A572]'}`}>
                {item.name}
                <span className={`absolute bottom-0 left-0 w-full h-2px bg-[#C5A572] transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
            )})}
            
            {user && (
              <Link 
                to="/my-bookings" 
                className={`relative text-xs font-bold tracking-widest uppercase transition-colors duration-300 group py-2 drop-shadow-md ${location.pathname === '/my-bookings' ? 'text-[#C5A572]' : 'text-gray-200 hover:text-[#C5A572]'}`}
              >
                Mis Reservas
                <span className={`absolute bottom-0 left-0 w-full h-2px bg-[#C5A572] transform origin-left transition-transform duration-300 ${location.pathname === '/my-bookings' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
            )}

            <div className="pl-6 border-l border-gray-500/50 flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                   <div className="flex items-center space-x-3 text-right">
                      <div className="hidden lg:block">
                          <p className="text-gray-300 text-[10px] uppercase tracking-widest drop-shadow-md">Bienvenido</p>
                          <p className="font-bold text-sm text-white drop-shadow-md">{user.name}</p>
                      </div>
                      <div className="h-9 w-9 rounded-full bg-black/50 border border-[#C5A572] flex items-center justify-center text-[#C5A572] shadow-sm">
                        <User className="h-5 w-5" />
                      </div>
                   </div>
                   <button onClick={handleLogout} className="p-2 rounded-full text-gray-300 hover:text-red-500 hover:bg-red-900/20 transition-all"><LogOut className="h-5 w-5 drop-shadow-md" /></button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="text-xs font-bold text-gray-200 hover:text-[#C5A572] transition-colors tracking-widest uppercase drop-shadow-md">Ingresar</Link>
                  <Link to="/register" className="px-6 py-2 text-xs font-bold text-black bg-linear-to-r from-[#C5A572] to-[#E0C185] hover:from-[#b08d4e] hover:to-[#C5A572] rounded-sm shadow-[0_0_15px_rgba(197,165,114,0.4)] transition-all duration-300 tracking-widest uppercase transform hover:-translate-y-0.5">Registro</Link>
                </>
              )}
            </div>
          </nav>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-200 hover:text-[#C5A572] transition-colors p-2 drop-shadow-md">
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 border-t border-gray-800 shadow-xl backdrop-blur-xl h-screen">
          <div className="px-4 py-8 space-y-6">
            {navItems.map((item) => {
               const isActive = location.pathname === item.path;
               return (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`block text-center text-xl font-bold tracking-widest uppercase py-4 border-b border-gray-800 ${isActive ? 'text-[#C5A572]' : 'text-gray-300'}`} 
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            )})}

            {user && (
              <Link 
                to="/my-bookings" 
                className={`block text-center text-xl font-bold tracking-widest uppercase py-4 border-b border-gray-800 ${location.pathname === '/my-bookings' ? 'text-[#C5A572]' : 'text-gray-300'}`} 
                onClick={() => setIsOpen(false)}
              >
                Mis Reservas
              </Link>
            )}

            <div className="pt-8 flex flex-col items-center space-y-6">
             {user ? (
                <>
                    <div className="text-center">
                      <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Sesión iniciada como</p>
                      <p className="font-serif font-bold text-2xl text-[#C5A572]">{user.name}</p>
                    </div>
                    <button onClick={handleLogout} className="flex items-center space-x-2 text-sm font-bold text-red-500 uppercase tracking-widest border border-red-500 px-6 py-3 rounded-full hover:bg-red-900/20 transition-colors w-full justify-center">
                        <LogOut className="h-5 w-5" /> <span>Cerrar Sesión</span>
                    </button>
                </>
             ) : (
              <div className="w-full space-y-4 px-8">
                <Link to="/login" className="block w-full text-center py-4 text-sm font-bold text-[#C5A572] border border-[#C5A572] rounded-sm tracking-widest uppercase hover:bg-[#C5A572]/10 transition-colors" onClick={() => setIsOpen(false)}>
                    Iniciar Sesión
                </Link>
                <Link to="/register" className="block w-full text-center py-4 text-sm font-bold text-black bg-[#C5A572] rounded-sm tracking-widest uppercase shadow-lg hover:bg-[#b08d4e] transition-colors" onClick={() => setIsOpen(false)}>
                    Registrarse
                </Link>
              </div>
             )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;