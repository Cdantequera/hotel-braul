import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Users, Search, Mail } from 'lucide-react';


const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://back-hotel-braul.onrender.com';

const getToken = () => {
  const token = localStorage.getItem('token');
  if (token) return token;
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try { return JSON.parse(userStr).token || null; } catch (e) { (e) }
  }
  return null;
};

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      // Ajustá esta ruta según cómo tengas configurado tu backend
      const res = await axios.get(`${backendUrl}/api/v1/users`, {
        headers: { Authorization: `Bearer ${getToken()}` },
        withCredentials: true
      });
      if (res.data.ok) {
        setUsers(res.data.users || res.data.data); // Depende de cómo envíes los datos desde el back
      }
    } catch (error) {
      error("Endpoint de usuarios posiblemente no creado aún");
      // toast.error('Error al cargar huéspedes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="text-white space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#C5A572] flex items-center gap-3">
            <Users className="h-8 w-8" />
            Huéspedes y Usuarios
          </h1>
          <p className="text-gray-400 text-sm mt-1">Directorio de clientes registrados en el sistema</p>
        </div>
        
        <div className="flex items-center bg-zinc-900 border border-gray-700 rounded-lg px-4 py-2 focus-within:border-[#C5A572] transition-colors w-full md:w-auto">
          <Search className="h-4 w-4 text-gray-500" />
          <input type="text" placeholder="Buscar por email o nombre..." className="bg-transparent border-none focus:ring-0 text-sm text-white ml-2 outline-none w-full" />
        </div>
      </div>

      <div className="bg-black border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 text-[#C5A572] animate-spin" />
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
                <p className="text-gray-500">No se encontraron huéspedes registrados o el endpoint aún no está listo.</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-zinc-900 text-gray-400 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Nombre Completo</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Rol</th>
                  <th className="px-6 py-4">Fecha de Registro</th>
                  <th className="px-6 py-4 text-center">Contactar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">{u.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${u.role === 'admin' ? 'bg-[#C5A572]/20 text-[#C5A572]' : 'bg-blue-900/30 text-blue-400'}`}>
                        {u.role ? u.role.toUpperCase() : 'USER'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(u.createdAt || Date.now()).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <a href={`mailto:${u.email}`} className="inline-block p-2 bg-zinc-800 text-gray-300 hover:text-[#C5A572] rounded transition-colors">
                        <Mail className="h-4 w-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;