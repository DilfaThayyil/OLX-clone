import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDihJ1nO7ItAIsyhBzt3IfMv3Dn87rhRiw",
  authDomain: "olx-clone-66548.firebaseapp.com",
  projectId: "olx-clone-66548",
  storageBucket: "olx-clone-66548.appspot.com",
  messagingSenderId: "851986154706",
  appId: "1:851986154706:web:31f2a72ce9b50be837d90b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app); // Firebase Storage setup
