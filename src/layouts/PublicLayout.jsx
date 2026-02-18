import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header'; // Ajusta la ruta si es necesario
import Footer from '../components/footer/Footer'; // Ajusta la ruta si es necesario

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* El Header y Footer vivirán AQUÍ, no en App.jsx */}
      <Header />
      
      <main className="flex-1">
        {/* Outlet renderiza el contenido de la página actual (Home, Rooms, etc.) */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;