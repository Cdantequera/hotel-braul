import { signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import axios from "axios"; 

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

class GoogleAuthService {
  
  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const nameParts = (user.displayName || "").split(" ");
      const firstName = nameParts[0] || "User";
      const lastName = nameParts.slice(1).join(" ") || "Google";

      const backendPayload = {
        email: user.email,
        name: firstName,
        surname: lastName,
        googleId: user.uid
      };

      const response = await axios.post(`${backendUrl}/api/v1/auth/google`, backendPayload, {
        withCredentials: true 
      });

      if (response.data.ok) {
        const userData = response.data.user;
        localStorage.setItem("user", JSON.stringify(userData));
        return userData;
      } else {
        throw new Error("Error en el backend del hotel");
      }

    } catch (error) {
      console.error(error);
      throw new Error(this.getErrorMessage(error.code || "unknown"));
    }
  }

  async logout() {
    try {
      if (auth.currentUser) {
        await firebaseSignOut(auth);
      }
    } catch (error) {
      error("Error al cerrar sesión de Google: ", Error);
    }
  }

  getErrorMessage(errorCode) {
    switch (errorCode) {
      case "auth/popup-closed-by-user":
        return "Login cancelado por el usuario";
      case "auth/popup-blocked":
        return "Popup bloqueado. Permite popups para este sitio";
      case "auth/network-request-failed":
        return "Error de conexión. Verifica tu internet";
      case "auth/too-many-requests":
        return "Demasiados intentos. Intenta más tarde";
      default:
        return "Error al iniciar sesión con Google";
    }
  }
}

const googleAuthService = new GoogleAuthService();

export default googleAuthService;