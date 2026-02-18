import React, { useState } from 'react';
import googleAuthService from '../../services/googleAuth'; // Importamos el servicio actualizado

const GoogleLoginButton = ({ onLogin, onError }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleClick = async () => {
    setIsLoading(true);
    try {
      // 1. Esto llama a Firebase Y LUEGO a tu Backend Node.js
      const user = await googleAuthService.loginWithGoogle();
      
      // 2. Si todo sale bien, notificamos al padre (Login.jsx)
      if (onLogin) onLogin(user);

    } catch (error) {
      console.error("Error en Google Button:", error);
      // 3. Si falla, notificamos el error para mostrarlo en rojo
      if (onError) onError(error.message || "Error al iniciar sesión con Google");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      disabled={isLoading}
      className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-linear-to-r from-[#C5A572] to-[#b08d4e] hover:from-[#b08d4e] hover:to-[#C5A572] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C5A572] transition-all duration-300 shadow-lg uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {/* Icono de Google (SVG simple) */}
      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
      {isLoading ? "Conectando..." : "Iniciar sesión con Google"}
    </button>
  );
};

export default GoogleLoginButton;