import React, { useState, useEffect } from "react";
import axios from "axios";
import { MessageSquare, Mail, User, Clock, CheckCircle, Trash2, Loader2, AlertCircle } from "lucide-react";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://back-hotel-braul.onrender.com";

const getToken = () => {
  const token = localStorage.getItem("token");
  if (token) return token;
  const userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      return JSON.parse(userStr).token || null;
    } catch (e) {
      return null;
    }
  }
  return null;
};

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
});

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${backendUrl}/api/v1/contact`, authHeaders());
      if (res.data.ok) {
        setMessages(res.data.messages || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error al cargar mensajes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await axios.patch(`${backendUrl}/api/v1/contact/${id}/read`, {}, authHeaders());
      // Actualizar el estado local para optimizar la interfaz
      setMessages(messages.map(m => m._id === id ? { ...m, isRead: true } : m));
    } catch (err) {
      alert("Error al marcar como leído");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este mensaje de forma permanente?")) return;
    try {
      await axios.delete(`${backendUrl}/api/v1/contact/${id}`, authHeaders());
      setMessages(messages.filter(m => m._id !== id));
    } catch (err) {
      alert("Error al eliminar mensaje");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif font-bold text-[#C5A572]">Bandeja de Entrada</h2>
          <p className="text-gray-400">Mensajes enviados desde el formulario de contacto</p>
        </div>
        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/10 text-gray-300 text-sm rounded-lg hover:border-[#C5A572] transition-colors"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageSquare className="h-4 w-4" />}
          Actualizar
        </button>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500/50 p-4 rounded-lg flex items-center text-red-400">
          <AlertCircle className="h-5 w-5 mr-3" />
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 text-[#C5A572] animate-spin" />
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-black border border-white/10 rounded-xl p-12 text-center">
          <Mail className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Sin mensajes nuevos</h3>
          <p className="text-gray-400">Todo está al día. No hay mensajes en la bandeja de entrada.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {messages.map((msg) => (
            <div 
              key={msg._id} 
              className={`bg-black border rounded-xl p-6 transition-all ${msg.isRead ? 'border-white/10 opacity-70' : 'border-[#C5A572]/50 shadow-[0_0_15px_rgba(197,165,114,0.1)]'}`}
            >
              <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-[#C5A572] text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                      {msg.name.charAt(0)}
                    </span>
                    <div>
                      <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        {msg.name} {msg.lastName}
                        {!msg.isRead && <span className="bg-green-500 text-black text-[10px] uppercase px-2 py-0.5 rounded-full font-bold">Nuevo</span>}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {msg.email}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(msg.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-zinc-900/50 p-4 rounded-lg text-gray-300 border border-white/5">
                    <p className="whitespace-pre-wrap">{msg.message}</p>
                  </div>
                </div>
                
                <div className="flex md:flex-col gap-2 justify-end">
                  {!msg.isRead && (
                    <button 
                      onClick={() => handleMarkAsRead(msg._id)}
                      className="flex items-center justify-center gap-2 bg-[#C5A572] text-black px-4 py-2 rounded font-bold hover:bg-white transition-colors text-sm"
                    >
                      <CheckCircle className="h-4 w-4" /> Marcar Leído
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(msg._id)}
                    className="flex items-center justify-center gap-2 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded font-bold transition-colors text-sm"
                  >
                    <Trash2 className="h-4 w-4" /> Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
