// Contenido para src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// NOTA: Reemplaza estos valores con tus credenciales reales de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC89gVLlWGWoPNZ2jn-NcVpoNrSam4P9jI",
  authDomain: "login-app-c8676.firebaseapp.com",
  projectId: "login-app-c8676",
  storageBucket: "login-app-c8676.firebasestorage.app",
  messagingSenderId: "352324099101",
  appId: "1:352324099101:web:f9ed5388403a15b1863af4",
  measurementId: "G-LKBH8KF4L5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, googleProvider, analytics };