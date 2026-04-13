# 🏨 Hotel Braul - Frontend

Este es el repositorio del frontend de **Hotel Braul**, una aplicación web moderna diseñada para la gestión integral de un hotel boutique. Permite a los huéspedes explorar habitaciones, realizar reservas y comunicarse con la administración, a la vez que proporciona un panel de gestión potente para los administradores.

## 🚀 Tecnologías Principales

El proyecto ha sido desarrollado utilizando un stack moderno, ágil y escalable:

- **Framework:** [React 19](https://react.dev/) montado sobre [Vite](https://vitejs.dev/) para una experiencia de desarrollo súper rápida.
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) integrado para un diseño responsivo, estético y centrado en la temática oscura/boutique.
- **Enrutamiento:** [React Router v7](https://reactrouter.com/) para el manejo de rutas protegidas y públicas de manera declarativa.
- **Formularios:** validaciones robustas con `react-hook-form` acoplado al resolutor de esquemas `zod`.
- **Integración de Pagos:** `@mercadopago/sdk-react` para el widget de pasarela de pago de MercadoPago.
- **Iconografía e Interacciones:** `lucide-react` para la iconografía moderna y `framer-motion` para animaciones fluidas.

## 📁 Estructura del Proyecto

```text
src/
├── components/   # Componentes reusables (Header, Footer, Cards, etc)
├── hook/         # Custom Hooks de React (ej: useSiteConfig)
├── layouts/      # Envoltorios de layout (MainLayout público, AdminLayout privado)
├── pages/        # Páginas o Vistas principales del sistema
│   ├── admin/    # Vistas exclusivas del Dashboard Administrativo
│   └── ...       # Vistas públicas (Home, Rooms, Contact, Login, etc)
├── routes/       # Definición y configuración modular del enrutador de React
└── App.jsx       # Punto de entrada de la aplicación
```

## ✨ Características Principales

*   **Sitio Público:** 
    *   Visualización de Habitaciones con filtrado de fechas (Check-In / Check-Out).
    *   Petición de registro y login de huéspedes.
    *   Formulario de contacto dinámico sin recargas en la página.
*   **Gestión de Cuentas:** 
    *   Seguimiento de historial de reservas directamente desde el perfil del huésped.
    *   Checkout y pasarela de pago.
*   **Módulo Administrativo Seguro (`/admin`):**
    *   Dashboard en tiempo real de la tasa de ocupación actual (calculada al día).
    *   Administración total del catálogo de Habitaciones (Subida de Imágenes, Edición, Eliminación controlada de cuartos activos).
    *   Gestión de la bandeja de entrada y lectura de formularios de Contacto.
    *   Ajuste dinámico de la información de Contacto de la empresa (Teléfono, WhatsApp, Redes Sociales).

## 📦 Instalación y Configuración Local

1. Clona el repositorio e instala las dependencias:
   ```bash
   npm install
   ```

2. Configura tus variables de entorno creando un archivo `.env` en la raíz del proyecto basándote en el ejemplo.
   ```env
   # Ejemplo de VITE_BACKEND_URL
   VITE_BACKEND_URL=http://localhost:4000
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

El proyecto estará corriendo localmente en `http://localhost:5173`.

---
*Desarrollado para proveer a los hoteles de una solución "llave en mano" con alto rendimiento y estándares visuales modernos.*
