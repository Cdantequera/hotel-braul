# 🏨 Hotel Bra'ul — Frontend

Aplicación web para la gestión y reserva de habitaciones del Hotel Bra'ul. Desarrollada con React y Vite, con un diseño de lujo moderno y oscuro.

---

## 🚀 Tecnologías Utilizadas

- **React 18** — Biblioteca principal de UI
- **Vite** — Bundler y servidor de desarrollo
- **React Router DOM** — Navegación entre páginas
- **Axios** — Peticiones HTTP al backend
- **Tailwind CSS** — Estilos utilitarios
- **Lucide React** — Iconografía
- **React Toastify** — Notificaciones toast

---

## 📁 Estructura del Proyecto

```
src/
├── App.jsx              # Componente raíz, carga las rutas
├── main.jsx             # Punto de entrada, monta la app con BrowserRouter y ToastContainer
├── routes/
│   └── Routes.jsx       # Definición de rutas de la aplicación
├── pages/
│   ├── Home.jsx         # Página principal (hero, widget de búsqueda, habitaciones destacadas)
│   ├── Rooms.jsx        # Listado de habitaciones disponibles
│   ├── Room.jsx         # Detalle y reserva de una habitación
│   ├── Login.jsx        # Inicio de sesión
│   ├── Services.jsx     # Servicios del hotel
│   └── Contact.jsx      # Contacto
└── index.css            # Estilos globales
```

---

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con la siguiente variable:

```env
VITE_BACKEND_URL=https://back-hotel-braul.onrender.com
```

> Si no se define, la app usa `https://back-hotel-braul.onrender.com` como URL por defecto.

---

## 🛠️ Instalación y Uso

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/hotel-braul-frontend.git
cd hotel-braul-frontend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL del backend

# 4. Iniciar el servidor de desarrollo
npm run dev

# 5. Build para producción
npm run build
```

---

## 🔗 Conexión con el Backend

La app consume la API REST del backend en:

```
https://back-hotel-braul.onrender.com/api/v1/
```

Endpoints principales utilizados:

| Método | Endpoint          | Descripción                        |
|--------|-------------------|------------------------------------|
| GET    | `/api/v1/rooms`   | Obtiene todas las habitaciones     |
| GET    | `/api/v1/rooms/:id` | Detalle de una habitación        |
| POST   | `/api/v1/bookings` | Crear una reserva                 |
| POST   | `/api/v1/auth/login` | Autenticación de usuario        |

---

## 🔐 Autenticación

La autenticación se maneja con tokens JWT almacenados en `localStorage`. Si el usuario intenta reservar sin haber iniciado sesión, es redirigido a `/login` con el parámetro `returnTo` para volver a la habitación original tras autenticarse.

---

## 🧩 Componentes Principales

### `Home.jsx`
- **Hero section** con imagen de fondo y título animado
- **BookingWidget** — formulario de búsqueda con fechas de llegada/salida y cantidad de huéspedes
- **Sección de servicios** — Infinity Pool, Spa, Gastronomía, Smart Living
- **Sección de suites destacadas** — muestra hasta 3 habitaciones con `isFeatured: true`

### `RoomCard`
Tarjeta de habitación con imagen, tipo, descripción, precio y botón de reserva. Requiere autenticación para continuar.

---

## 📦 Scripts Disponibles

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build de producción
npm run preview   # Vista previa del build
npm run lint      # Linter (ESLint)
```

---

## 📄 Licencia

Este proyecto es de uso privado para Hotel Bra'ul.
