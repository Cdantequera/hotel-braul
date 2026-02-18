import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";


function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogin = (userData) => {
    console.log("Login Exitoso:", userData);
    setError(null);
    
    // 1. GUARDAMOS EL TOKEN INDEPENDIENTEMENTE (LA SOLUCIÓN AL ERROR 401)
    if (userData.token) {
      localStorage.setItem("token", userData.token);
    }

    // 2. Guardamos los datos del usuario en memoria
    // Si tu backend envía los datos del usuario dentro de "user", guardamos eso, si no, guardamos todo.
    const userToSave = userData.user ? userData.user : userData;
    localStorage.setItem("user", JSON.stringify(userToSave));

    // 3. LÓGICA DE REDIRECCIÓN INTELIGENTE
    const userRole = userToSave.role || userData.role;
    if (userRole === 'admin') {
      // Si es Admin (o Super Admin), lo mandamos al Dashboard
      navigate("/admin/dashboard"); 
    } else {
      // Si es un cliente normal, lo mandamos al Home
      navigate("/home");
    }
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 pt-25 pb-4 md:pt-25 md:py-12 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-black p-6 md:p-8 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(197,165,114,0.15)] border border-gray-100 dark:border-[#C5A572]/30">
        
        <div className="flex flex-col items-center">
          <h2 className="mt-2 text-center text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white tracking-wide uppercase">
            Bienvenido a <span className="text-[#C5A572]">Bra'ul</span>
          </h2>
          <p className="mt-2 text-center text-xs md:text-sm text-gray-600 dark:text-gray-400 tracking-wider">
            Inicia sesión para gestionar tus reservas
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded shadow-sm">
            <p className="text-sm text-red-700 dark:text-red-400 font-medium text-center">{error}</p>
          </div>
        )}

        <LoginForm onLogin={handleLogin} onError={handleError} />

        {/* Link Olvidaste Contraseña */}
        <div className="flex justify-end mt-1">
            <Link 
              to="/forgot-password" 
              className="text-xs font-medium text-gray-500 hover:text-[#C5A572] dark:text-gray-400 dark:hover:text-[#C5A572] transition-colors duration-300"
            >
              ¿Olvidaste tu contraseña?
            </Link>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-black text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[10px]">
                O continúa con
              </span>
            </div>
          </div>

          <div className="mt-6">
            <GoogleLoginButton onLogin={handleLogin} onError={handleError} />
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="font-bold text-[#C5A572] hover:text-[#b08d4e] transition-colors uppercase tracking-wide">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;