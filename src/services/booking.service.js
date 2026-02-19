import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://back-hotel-braul.onrender.com';
const API_URL = `${backendUrl}/api/v1/bookings`;

const getConfig = () => {
  let token = localStorage.getItem('token');
  if (!token) {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        token = userObj.token || userObj.data?.token;
      } catch (error) {(error)}
    }
  }
  return {
    headers: { Authorization: token ? `Bearer ${token}` : '' },
    withCredentials: true 
  };
};

export const createBookingService = async (bookingData) => {
  try {
    const response = await axios.post(`${API_URL}/`, bookingData, getConfig());
    return response.data;
  } catch (error) { throw error.response?.data || { message: "Error al procesar" }; }
};

export const getUserBookingsService = async () => {
  try {
    const response = await axios.get(`${API_URL}/my-bookings`, getConfig());
    return response.data;
  } catch (error) { throw error.response?.data || { message: "Error al obtener reservas" }; }
};

export const cancelBookingService = async (bookingId) => {
  try {
    const response = await axios.patch(`${API_URL}/${bookingId}/cancel`, {}, getConfig());
    return response.data;
  } catch (error) { throw error.response?.data || { message: "Error al cancelar" }; }
};