import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3-NGo_vUHQjtNJ2epLRghnAhaItUu5x4",
  authDomain: "vybe-app-9a39d.firebaseapp.com",
  projectId: "vybe-app-9a39d",
  storageBucket: "vybe-app-9a39d.firebasestorage.app",
  messagingSenderId: "191939127776",
  appId: "1:191939127776:web:fc11745efed9bd05786385"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export async function getIdToken() {
  const user = auth.currentUser;
  if (!user) return null;
  return user.getIdToken();
}
