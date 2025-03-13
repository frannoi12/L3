import React, { createContext, useState, useEffect, ReactNode } from 'react';
const initialValues = {
    email: "",
    token: "",
    authorities: "",
  };
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialValues);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};