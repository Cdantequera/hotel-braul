import React, { useState, useEffect } from 'react';
import { Phone, Mail, Instagram, Facebook, Twitter, Save, Loader2, CheckCircle, MessageCircle } from 'lucide-react';
import { getSiteConfigService, updateSiteConfigService } from '../../services/siteConfig.service';
import { toast } from 'react-toastify';

const Settings = () => {
    const [formData, setFormData] = useState({
        phone: '',
        whatsapp: '',
        email: '',
        instagram: '',
        facebook: '',
        twitter: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await getSiteConfigService();
                if (res.ok) {
                    // Llenamos el form con los datos actuales del backend
                    const { phone, whatsapp, email, instagram, facebook, twitter } = res.config;
                    setFormData({ phone, whatsapp, email, instagram, facebook, twitter });
                }
            } catch (error) {
                error('No se pudo cargar la configuración');
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await updateSiteConfigService(formData);
            if (res.ok) {
                toast.success('¡Configuración guardada correctamente!');
            }
        } catch (error) {
            toast.error(error.message || 'Error al guardar');
        } finally {
            setSaving(false);
        }
    };

    
    const labelClass = "block text-xs uppercase text-[#C5A572] font-bold tracking-wider mb-2";

    if (loading) return (
        <div className="flex justify-center items-center py-32">
            <Loader2 className="h-10 w-10 text-[#C5A572] animate-spin" />
        </div>
    );

    return (
        <div className="text-white max-w-3xl">

            {/* Encabezado */}
            <div className="mb-10">
                <h1 className="text-3xl font-serif font-bold text-[#C5A572]">Configuración del Sitio</h1>
                <p className="text-gray-400 text-sm mt-1">
                    Estos datos se muestran automáticamente en el footer y la página de contacto.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* SECCIÓN: Contacto */}
                <div className="bg-black border border-white/10 rounded-2xl p-8">
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                        <span className="bg-[#C5A572] w-1.5 h-6 rounded-full"></span>
                        Datos de Contacto
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelClass}>Teléfono</label>
                            <div className="flex items-center gap-3 bg-zinc-900/50 border border-gray-700 rounded-lg px-3 focus-within:border-[#C5A572] transition-colors">
                                <Phone className="h-4 w-4 text-gray-500 shrink-0" />
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+54 11 1234-5678"
                                    className="bg-transparent py-3 text-white w-full outline-none placeholder-gray-600"
                                />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>WhatsApp</label>
                            <div className="flex items-center gap-3 bg-zinc-900/50 border border-gray-700 rounded-lg px-3 focus-within:border-[#C5A572] transition-colors">
                                <MessageCircle className="h-4 w-4 text-gray-500 shrink-0" />
                                <input
                                    type="text"
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    placeholder="+54 9 11 1234-5678"
                                    className="bg-transparent py-3 text-white w-full outline-none placeholder-gray-600"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className={labelClass}>Email de Contacto</label>
                            <div className="flex items-center gap-3 bg-zinc-900/50 border border-gray-700 rounded-lg px-3 focus-within:border-[#C5A572] transition-colors">
                                <Mail className="h-4 w-4 text-gray-500 shrink-0" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="contacto@hotelbraul.com"
                                    className="bg-transparent py-3 text-white w-full outline-none placeholder-gray-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECCIÓN: Redes Sociales */}
                <div className="bg-black border border-white/10 rounded-2xl p-8">
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                        <span className="bg-[#C5A572] w-1.5 h-6 rounded-full"></span>
                        Redes Sociales
                    </h2>
                    <p className="text-gray-500 text-xs mb-6 -mt-2">Ingresá la URL completa de cada perfil. Dejá vacío para ocultar el ícono.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelClass}>Instagram</label>
                            <div className="flex items-center gap-3 bg-zinc-900/50 border border-gray-700 rounded-lg px-3 focus-within:border-[#C5A572] transition-colors">
                                <Instagram className="h-4 w-4 text-gray-500 shrink-0" />
                                <input
                                    type="url"
                                    name="instagram"
                                    value={formData.instagram}
                                    onChange={handleChange}
                                    placeholder="https://instagram.com/hotelbraul"
                                    className="bg-transparent py-3 text-white w-full outline-none placeholder-gray-600"
                                />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Facebook</label>
                            <div className="flex items-center gap-3 bg-zinc-900/50 border border-gray-700 rounded-lg px-3 focus-within:border-[#C5A572] transition-colors">
                                <Facebook className="h-4 w-4 text-gray-500 shrink-0" />
                                <input
                                    type="url"
                                    name="facebook"
                                    value={formData.facebook}
                                    onChange={handleChange}
                                    placeholder="https://facebook.com/hotelbraul"
                                    className="bg-transparent py-3 text-white w-full outline-none placeholder-gray-600"
                                />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Twitter / X</label>
                            <div className="flex items-center gap-3 bg-zinc-900/50 border border-gray-700 rounded-lg px-3 focus-within:border-[#C5A572] transition-colors">
                                <Twitter className="h-4 w-4 text-gray-500 shrink-0" />
                                <input
                                    type="url"
                                    name="twitter"
                                    value={formData.twitter}
                                    onChange={handleChange}
                                    placeholder="https://twitter.com/hotelbraul"
                                    className="bg-transparent py-3 text-white w-full outline-none placeholder-gray-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Botón guardar */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-[#C5A572] to-[#b08d4e] text-black font-bold uppercase tracking-widest rounded-lg hover:shadow-[0_0_20px_rgba(197,165,114,0.4)] transition-all disabled:opacity-60"
                    >
                        {saving
                            ? <><Loader2 className="h-5 w-5 animate-spin" /> Guardando...</>
                            : <><CheckCircle className="h-5 w-5" /> Guardar Cambios</>
                        }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Settings;