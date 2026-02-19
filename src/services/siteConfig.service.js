import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://back-hotel-braul.onrender.com';
const API_URL = `${backendUrl}/api/v1/config`;

const getAuthConfig = () => {
    let token = localStorage.getItem('token');
    if (!token) {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const userObj = JSON.parse(userStr);
                token = userObj.token || null;
            } catch (e) {(e)}
        }
    }
    return {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
        withCredentials: true
    };
};

// Público - para Footer y Contact
export const getSiteConfigService = async () => {
    try {
        const res = await axios.get(API_URL);
        return res.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error al obtener configuración' };
    }
};

// Solo Admin
export const updateSiteConfigService = async (configData) => {
    try {
        const res = await axios.put(API_URL, configData, getAuthConfig());
        return res.data;
    } catch (error) {
        throw error.response?.data || { message: 'Error al actualizar configuración' };
    }
};