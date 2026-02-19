import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../utils/validationSchema";
import { Mail, Lock, Loader2 } from "lucide-react"; 
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://back-hotel-braul.onrender.com';

const inputClasses = `
  appearance-none relative block w-full px-3 py-3 pl-10 
  border border-gray-300 dark:border-gray-700 
  placeholder-gray-500 dark:placeholder-gray-400 
  text-gray-900 dark:text-white 
  bg-white dark:bg-gray-900/50 
  rounded-md 
  focus:outline-none focus:ring-[#C5A572] focus:border-[#C5A572] focus:z-10 
  sm:text-sm transition-all duration-300
  
  [&:autofill]:shadow-[0_0_0_30px_black_inset_!important] 
  [&:autofill]:-webkit-text-fill-color:white
  dark:[&:autofill]:shadow-[0_0_0_30px_black_inset_!important] 
  dark:[&:autofill]:-webkit-text-fill-color:white
`;

function LoginForm({ onLogin, onError }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${backendUrl}/api/v1/auth/login`, {
        email: data.email,
        password: data.password
      }, {
        withCredentials: true 
      });

      if (response.data.ok) {
        onLogin(response.data);
      }

    } catch (error) {
      console.error("Error login:", error);
      const message = error.response?.data?.message || "Error al conectar con el servidor";
      if (onError) onError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Correo Electrónico
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="email"
                placeholder="tu_email@hotel.com"
                className={`${inputClasses} ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                {...register("email")}
            />
        </div>
        {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Contraseña
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
                type="password"
                placeholder="Tu Password *****"
                className={`${inputClasses} ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                {...register("password")}
            />
        </div>
        {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-linear-to-r from-[#C5A572] to-[#b08d4e] hover:from-[#b08d4e] hover:to-[#C5A572] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C5A572] transition-all duration-300 shadow-lg uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
             <><Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /> Iniciando...</>
          ) : (
             "Iniciar Sesión"
          )}
      </button>
    </form>
  );
}

export default LoginForm;