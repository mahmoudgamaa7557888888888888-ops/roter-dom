import { auth } from "../firebaseConfig";
import { useEffect } from "react";
import { useState } from "react";
import { AuthStateContext } from "./AuthStateContext";

export const AuthStateProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false)
      } else {
        setUser(null);
        setLoading(false)
        
        
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthStateContext.Provider value={{ user , loading }}>
      {children}
    </AuthStateContext.Provider>
  );
};
