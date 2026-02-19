import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit, Image as ImageIcon, Loader2, X, CheckCircle, Star } from 'lucide-react';
import { toast } from 'react-toastify';

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  // Estado del Formulario
  const [formData, setFormData] = useState({
    number: '',
    type: 'Simple', 
    price: '',
    description: '',
    image: null,
    isFeatured: false // Estado inicial
  });
  
  const [previewUrl, setPreviewUrl] = useState(null);

  // Cargar habitaciones al iniciar
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://back-hotel-braul.onrender.com/api/v1/rooms');
      if (res.data.ok) setRooms(res.data.data);
    } catch (error) {
      console.error("Error cargando habitaciones:", error);
      toast.error("Error al cargar el inventario");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setFormData({ ...formData, image: file });
        setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append('number', formData.number);
      data.append('type', formData.type);
      data.append('price', formData.price);
      data.append('description', formData.description);
      data.append('image', formData.image); 
      data.append('isFeatured', formData.isFeatured); // Enviamos el estado de destacado

      const res = await axios.post('https://back-hotel-braul.onrender.com/api/v1/rooms', data, {
        withCredentials: true, 
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.data.ok) {
        toast.success("¡Habitación creada exitosamente!");
        setShowForm(false);
        fetchRooms(); 
        // Reset
        setFormData({ number: '', type: 'Simple', price: '', description: '', image: null, isFeatured: false });
        setPreviewUrl(null);
      }

    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Error al crear habitación";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta habitación?")) return;
    try {
      await axios.delete(`https://back-hotel-braul.onrender.com/api/v1/rooms/${id}`, { withCredentials: true });
      toast.success("Habitación eliminada");
      fetchRooms();
    } catch (error) {
        console.error(error);
        const msg = error.response?.data?.message || "No se pudo eliminar";
        toast.error(msg);
    }
  };

  // --- NUEVA FUNCIÓN: Toggle Destacado ---
  const toggleFeature = async (room) => {
    try {
        const newValue = !room.isFeatured;
        await axios.put(`https://back-hotel-braul.onrender.com/api/v1/rooms/${room._id}`, 
            { isFeatured: newValue }, 
            { withCredentials: true }
        );
        fetchRooms(); // Refrescamos para ver el cambio visual
        toast.success(newValue ? "Habitación Destacada en Home" : "Quitada de destacados");
    } catch (error) {
        console.error(error);
        toast.error("Error al actualizar estado");
    }
  };

  return (
    <div className="text-white">
        
        {/* ENCABEZADO */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-serif font-bold text-[#C5A572]">Gestión de Habitaciones</h1>
                <p className="text-gray-400 text-sm">Administra el inventario y destaca las mejores suites</p>
            </div>
            <button 
                onClick={() => setShowForm(!showForm)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 shadow-lg ${
                    showForm 
                    ? 'bg-zinc-800 text-white hover:bg-zinc-700' 
                    : 'bg-[#C5A572] text-black hover:bg-[#b08d4e] hover:scale-105'
                }`}
            >
                {showForm ? <X className="h-5 w-5"/> : <Plus className="h-5 w-5" />}
                <span>{showForm ? 'Cancelar' : 'Nueva Habitación'}</span>
            </button>
        </div>

        {/* FORMULARIO */}
        {showForm && (
            <div className="bg-black border border-[#C5A572]/30 p-8 rounded-2xl mb-12 shadow-[0_0_30px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-top-4">
                <h2 className="text-xl font-bold mb-6 text-white flex items-center">
                    <span className="bg-[#C5A572] w-2 h-8 mr-3 rounded-full"></span>
                    Datos de la Habitación
                </h2>
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    
                    {/* COLUMNA IZQUIERDA */}
                    <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs uppercase text-[#C5A572] font-bold tracking-wider mb-2">Número</label>
                            <input type="number" name="number" required value={formData.number} onChange={handleInputChange} className="w-full bg-zinc-900/50 border border-gray-700 p-3 rounded-lg text-white focus:border-[#C5A572] outline-none" placeholder="Ej: 101" />
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-[#C5A572] font-bold tracking-wider mb-2">Categoría</label>
                            <select name="type" value={formData.type} onChange={handleInputChange} className="w-full bg-zinc-900/50 border border-gray-700 p-3 rounded-lg text-white focus:border-[#C5A572] outline-none">
                                <option value="Simple">Simple</option>
                                <option value="Doble">Doble</option>
                                <option value="Suite">Suite</option>
                                <option value="Familiar">Familiar</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-[#C5A572] font-bold tracking-wider mb-2">Precio / Noche ($)</label>
                            <input type="number" name="price" required value={formData.price} onChange={handleInputChange} className="w-full bg-zinc-900/50 border border-gray-700 p-3 rounded-lg text-white focus:border-[#C5A572] outline-none" placeholder="Ej: 150" />
                        </div>
                        
                        {/* Checkbox Destacada en Formulario */}
                        <div className="flex items-center pt-6">
                            <label className="flex items-center cursor-pointer space-x-3">
                                <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} className="form-checkbox h-5 w-5 text-[#C5A572] rounded border-gray-700 bg-zinc-900 focus:ring-[#C5A572]" />
                                <span className="text-white font-bold text-sm uppercase">Destacar en Home</span>
                            </label>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs uppercase text-[#C5A572] font-bold tracking-wider mb-2">Descripción</label>
                            <textarea name="description" required rows="3" value={formData.description} onChange={handleInputChange} className="w-full bg-zinc-900/50 border border-gray-700 p-3 rounded-lg text-white focus:border-[#C5A572] outline-none resize-none" placeholder="Detalles, vistas, comodidades..."></textarea>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: Imagen */}
                    <div className="md:col-span-4 flex flex-col">
                        <label className="block text-xs uppercase text-[#C5A572] font-bold tracking-wider mb-2">Fotografía</label>
                        <div className={`relative border-2 border-dashed border-gray-700 bg-zinc-900/30 rounded-xl h-full min-h-[200px] flex flex-col items-center justify-center cursor-pointer hover:border-[#C5A572] hover:bg-zinc-900/50 transition-all overflow-hidden group`}>
                            <input type="file" name="image" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" accept="image/*" />
                            {previewUrl ? (
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <>
                                    <ImageIcon className="h-10 w-10 text-gray-500 mb-3 group-hover:text-[#C5A572] transition-colors"/>
                                    <p className="text-gray-400 text-sm text-center px-4">Subir foto</p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="md:col-span-12 flex justify-end mt-4">
                        <button type="submit" disabled={submitting} className="bg-linear-to-r from-[#C5A572] to-[#b08d4e] text-black font-bold py-3 px-8 rounded-lg hover:shadow-[0_0_20px_rgba(197,165,114,0.4)] transition-all flex items-center">
                            {submitting ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : <CheckCircle className="h-5 w-5 mr-2" />}
                            {submitting ? "Guardando..." : "Guardar Habitación"}
                        </button>
                    </div>
                </form>
            </div>
        )}

        {/* LISTA DE HABITACIONES */}
        {loading ? (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="h-10 w-10 text-[#C5A572] animate-spin" />
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {rooms.map((room) => (
                    <div key={room._id} className={`bg-zinc-900 border rounded-xl overflow-hidden group transition-all duration-300 flex flex-col ${room.isFeatured ? 'border-[#C5A572] shadow-[0_0_15px_rgba(197,165,114,0.2)]' : 'border-white/5 hover:border-[#C5A572]/50'}`}>
                        
                        <div className="h-56 overflow-hidden relative">
                            <img 
                                src={`https://back-hotel-braul.onrender.com/uploads/rooms/${room.image}`} 
                                alt={`Room ${room.number}`} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Sin+Imagen" }} 
                            />
                            
                            {/* BOTÓN ESTRELLA (DESTACAR) */}
                            <button 
                                onClick={() => toggleFeature(room)}
                                className="absolute top-3 left-3 z-10 p-2 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 transition-all hover:scale-110 hover:bg-black/80"
                                title={room.isFeatured ? "Quitar de destacados" : "Destacar en Home"}
                            >
                                <Star className={`h-5 w-5 transition-colors ${room.isFeatured ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400 hover:text-yellow-200'}`} />
                            </button>

                            <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#C5A572] border border-[#C5A572]/20">
                                Hab. {room.number}
                            </div>
                            <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/90 to-transparent p-4">
                                <h3 className="font-serif font-bold text-lg text-white">{room.type}</h3>
                            </div>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">{room.description}</p>
                                <div className="flex items-center space-x-2 mb-4">
                                     <span className="text-2xl font-bold text-white">${room.price}</span>
                                     <span className="text-xs text-gray-500 uppercase">/ Noche</span>
                                </div>
                            </div>
                            
                            <div className="flex gap-3 pt-4 border-t border-white/10">
                                <button className="flex-1 py-2 rounded bg-zinc-800 text-gray-300 text-xs font-bold hover:bg-[#C5A572] hover:text-black transition-colors flex items-center justify-center gap-2">
                                    <Edit className="h-3 w-3"/> Editar
                                </button>
                                <button onClick={() => handleDelete(room._id)} className="flex-1 py-2 rounded bg-red-900/20 text-red-500 border border-red-900/30 text-xs font-bold hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center gap-2">
                                    <Trash2 className="h-3 w-3"/> Eliminar
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

export default ManageRooms;