import { useRoutes } from 'react-router-dom';
import { authRoutes } from './modules/auth.routes';
import { publicRoutes } from './modules/public.routes';
import { adminRoutes } from './modules/admin.routes'; // Cuando la tengas lista

// Página 404 Simple
const NotFound = () => (
  <div className="text-center py-20 bg-black min-h-screen text-white pt-32">
    <h1 className="text-5xl font-bold text-[#C5A572] mb-4">404</h1>
    <p className="text-xl text-gray-400">Página no encontrada.</p>
  </div>
);

const AppRoutes = () => {
  
  const element = useRoutes([
    ...publicRoutes,
    ...authRoutes,
    ...adminRoutes,
    { path: "*", element: <NotFound /> } 
  ]);

  return element;
};

export default AppRoutes;