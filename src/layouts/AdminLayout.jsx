import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BedDouble, 
  CalendarDays, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  Bell, 
  Search 
} from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Recuperar usuario del localStorage (Simulado o Real)
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Admin', role: 'admin' };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Habitaciones', path: '/admin/rooms', icon: BedDouble },
    { name: 'Reservas', path: '/admin/bookings', icon: CalendarDays }, // Futuro
    { name: 'Huéspedes', path: '/admin/users', icon: Users }, // Futuro
    { name: 'Configuración', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-zinc-950 text-white font-sans overflow-hidden">
      
      {/* --- 1. SIDEBAR --- */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-black border-r border-white/10 transition-all duration-300 flex flex-col z-20`}>
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-center border-b border-white/10">
            {sidebarOpen ? (
                <h1 className="text-xl font-serif font-bold text-[#C5A572] tracking-widest">BRA'UL <span className="text-white text-xs">ADMIN</span></h1>
            ) : (
                <span className="text-[#C5A572] font-bold text-xl">B</span>
            )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 space-y-2 px-2">
            {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <Link 
                        key={item.name} 
                        to={item.path}
                        className={`flex items-center p-3 rounded-lg transition-all duration-200 group ${
                            isActive 
                            ? 'bg-[#C5A572] text-black font-bold shadow-[0_0_15px_rgba(197,165,114,0.4)]' 
                            : 'text-gray-400 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        <item.icon className={`h-5 w-5 ${!sidebarOpen && 'mx-auto'}`} />
                        {sidebarOpen && <span className="ml-3">{item.name}</span>}
                    </Link>
                );
            })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
            <button 
                onClick={handleLogout}
                className="flex items-center w-full p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
            >
                <LogOut className={`h-5 w-5 ${!sidebarOpen && 'mx-auto'}`} />
                {sidebarOpen && <span className="ml-3">Salir</span>}
            </button>
        </div>
      </aside>

      {/* --- 2. MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* HEADER */}
        <header className="h-16 bg-black/50 backdrop-blur-md border-b border-white/10 flex justify-between items-center px-6">
            <div className="flex items-center">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-gray-400 hover:text-white rounded-lg">
                    <Menu className="h-6 w-6" />
                </button>
                {/* Buscador Global */}
                <div className="ml-4 hidden md:flex items-center bg-zinc-900 border border-gray-700 rounded-full px-4 py-1.5 focus-within:border-[#C5A572] transition-colors">
                    <Search className="h-4 w-4 text-gray-500" />
                    <input type="text" placeholder="Buscar reserva, habitación..." className="bg-transparent border-none focus:ring-0 text-sm text-white ml-2 w-64 outline-none" />
                </div>
            </div>

            <div className="flex items-center space-x-6">
                {/* Estado del Hotel */}
                <div className="hidden md:flex flex-col items-end mr-4">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Estado Hotel</span>
                    <span className="text-xs font-bold text-green-400 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                        OPERATIVO
                    </span>
                </div>

                {/* Notificaciones */}
                <button className="relative text-gray-400 hover:text-[#C5A572] transition-colors">
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Perfil */}
                <div className="flex items-center space-x-3 pl-6 border-l border-gray-700">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-white">{user.name}</p>
                        <p className="text-xs text-[#C5A572] uppercase">{user.role}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-[#C5A572] flex items-center justify-center text-black font-bold">
                        {user.name.charAt(0)}
                    </div>
                </div>
            </div>
        </header>

        {/* CANVAS (Aquí se renderizan las páginas hijas como Dashboard o ManageRooms) */}
        <main className="flex-1 overflow-y-auto bg-zinc-900/50 p-6 scrollbar-thin scrollbar-thumb-[#C5A572]/20 scrollbar-track-transparent">
            <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;