import PublicLayout from '../../layouts/PublicLayout'; 
import Home from '../../pages/Home';
import Rooms from '../../pages/Rooms';
import RoomDetail from '../../pages/RoomDetail'; 
import Services from '../../pages/Services';
import Contact from '../../pages/Contact';
import MyBookings from '../../pages/MyBookings'; 

export const publicRoutes = [
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/rooms", element: <Rooms /> },
      { path: "/room/:id", element: <RoomDetail /> }, 
      { path: "/my-bookings", element: <MyBookings /> }, 
      { path: "/services", element: <Services /> },
      { path: "/contact", element: <Contact /> },
    ]
  }
];