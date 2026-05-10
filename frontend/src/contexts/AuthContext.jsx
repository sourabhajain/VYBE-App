import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import api from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // firebase user
  const [serverUser, setServerUser] = useState(null); // backend user
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      setUser(firebaseUser);

      window.__VYBE_AUTH__ = auth;
      
      if (firebaseUser) {
        try {
          const res = await api.post("/api/auth/ensure");
          setServerUser(res.data.user ?? res.data);
        } catch (err) {
          console.error("Backend ensure error:", err.response?.data || err);
        }
      } else {
        setServerUser(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, serverUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
