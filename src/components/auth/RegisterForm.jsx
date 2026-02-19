import { useState } from 'react';
import axios from 'axios';
import { User, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://back-hotel-braul.onrender.com';

const RegisterForm = ({ onRegister }) => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (serverError) setServerError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setServerError(null);

    if (formData.password !== formData.confirmPassword) {
      setServerError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        password: formData.password
      };

      const response = await axios.post(`${backendUrl}/api/v1/auth/register`, payload);

      if (response.data.ok) {
        if (onRegister) {
            onRegister(response.data.user); 
        }
      }

    } catch (error) {
      console.error("Error de registro:", error);
      
      if (error.response && error.response.data) {
        let msg = error.response.data.message || "Error al registrarse";
        if (error.response.data.errors) {
            const errs = error.response.data.errors;
            if (typeof errs === 'object') {
                const firstKey = Object.keys(errs)[0];
                msg = errs[firstKey]?.msg || msg;
            } else if (Array.isArray(errs)) {
                msg = errs[0] || msg;
            }
        }
        setServerError(msg);
      } else {
        setServerError("Error de conexión con el servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  
  const inputClasses = "appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-900/50 rounded-md focus:outline-none focus:ring-[#C5A572] focus:border-[#C5A572] focus:z-10 sm:text-sm transition-all duration-300";

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      
      {serverError && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded shadow-sm flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-sm text-red-700 dark:text-red-400">{serverError}</p>
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className={inputClasses}
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    id="surname"
                    name="surname"
                    type="text"
                    required
                    className={inputClasses}
                    placeholder="Apellido"
                    value={formData.surname}
                    onChange={handleChange}
                />
            </div>
        </div>

        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
                id="email-register"
                name="email"
                type="email"
                required
                className={inputClasses}
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
            />
        </div>

        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
                id="password-register"
                name="password"
                type="password"
                required
                minLength={6}
                className={inputClasses}
                placeholder="Contraseña (mín 6 caracteres)"
                value={formData.password}
                onChange={handleChange}
            />
        </div>

        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[#C5A572]" /> 
            </div>
            <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                required
                className={inputClasses}
                placeholder="Confirmar Contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
            />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-linear-to-r from-[#C5A572] to-[#b08d4e] hover:from-[#b08d4e] hover:to-[#C5A572] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C5A572] transition-all duration-300 shadow-lg uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
             <><Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /> Registrando...</>
          ) : (
             "Crear Cuenta"
          )}
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;