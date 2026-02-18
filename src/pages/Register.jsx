import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

function Register() {
  const navigate = useNavigate();

  // Esta función se ejecuta cuando el formulario confirma que el registro fue OK
  const handleRegisterSuccess = (userData) => {
    // Redirigimos a la verificación y le pasamos el email automáticamente
    navigate("/verify", { state: { email: userData.email } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-2 sm:px-4 lg:px-8 pt-1 pb-5 md:pt-25 md:py-12 transition-colors duration-300">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-black p-8 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(197,165,114,0.15)] border border-gray-100 dark:border-[#C5A572]/30">
        
        <div className="flex flex-col items-center">
          <h2 className="text-center text-3xl font-serif font-bold text-gray-900 dark:text-white tracking-wide uppercase">
            Únete a <span className="text-[#C5A572]">Bra'ul</span>
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 tracking-wider">
            Comienza tu experiencia de lujo
          </p>
        </div>

        {/* Componente del Formulario: Le pasamos la función para que nos avise al terminar */}
        <RegisterForm onRegister={handleRegisterSuccess} />
        
        <div className="text-center mt-4">
           <p className="text-sm text-gray-600 dark:text-gray-400">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="font-bold text-[#C5A572] hover:text-[#b08d4e] transition-colors">
              INICIAR SESIÓN
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;