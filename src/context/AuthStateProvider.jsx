import { auth } from "../firebaseConfig";
import { useEffect } from "react";
import { useState } from "react";
import { AuthStateContext } from "./AuthStateContext";

export const AuthStateProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthStateContext.Provider value={{ user }}>
      {children}
    </AuthStateContext.Provider>
  );
};
