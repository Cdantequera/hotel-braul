import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Mail, Key, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import logoHotel from '../assets/logo-braul.png';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const initialEmail = location.state?.email || "";

  const [formData, setFormData] = useState({
    email: initialEmail,
    code: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await axios.post(`${backendUrl}/api/v1/auth/verify`, {
        email: formData.email,
        code: formData.code
      });

      if (response.data.ok) {
        setMessage("¡Cuenta verificada con éxito! Redirigiendo...");
        setTimeout(() => {
            navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "El código es incorrecto o ha expirado.");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "appearance-none relative block w-full px-3 py-3 pl-10 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-900/50 rounded-md focus:outline-none focus:ring-[#C5A572] focus:border-[#C5A572] focus:z-10 sm:text-sm transition-all duration-300";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-black p-8 rounded-xl shadow-[0_0_40px_rgba(197,165,114,0.15)] border border-gray-100 dark:border-[#C5A572]/30">
        
        <div className="text-center">
          <div className="h-14 w-14 mx-auto rounded-full border-2 border-[#C5A572] mb-4 shadow-lg overflow-hidden">
             <img src={logoHotel} alt="Logo" className="h-full w-full object-cover scale-110" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white uppercase tracking-wide">
            Verificar Cuenta
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Ingresa el código que enviamos a tu correo.
          </p>
        </div>

        {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
        )}

        {message && (
            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded flex items-center justify-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <p className="text-sm text-green-700 dark:text-green-400 font-medium">{message}</p>
            </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  className={inputClasses}
                  placeholder="Tu correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                />
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-[#C5A572]" />
                </div>
                <input
                  name="code"
                  type="text"
                  required
                  maxLength={6}
                  className={`${inputClasses} tracking-[0.5em] font-mono text-center font-bold`} 
                  placeholder="CÓDIGO"
                  value={formData.code}
                  onChange={handleChange}
                />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-linear-to-r from-[#C5A572] to-[#b08d4e] hover:from-[#b08d4e] hover:to-[#C5A572] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C5A572] transition-all duration-300 shadow-lg uppercase tracking-widest disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Verificar Código"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;