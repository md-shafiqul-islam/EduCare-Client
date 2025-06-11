import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext";
import { auth } from "../firebase/firebase.config";
import { useState } from "react";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const authContextValue = {
    user,
    setUser,
    createUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
