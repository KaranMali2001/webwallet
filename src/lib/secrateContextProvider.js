"use client";
import { createContext, ReactNode, useContext, useState } from "react";

// Correct naming
const SecretContext = createContext(null);

export const SecretProvider = ({ children }) => {
  const [secret, setSecret] = useState("");

  function secretKeeper(fileData) {
    console.log("file data in context is ", fileData);
    setSecret(fileData);
    console.log("secrate in context is ", secret);
  }

  return (
    <SecretContext.Provider value={{ secret, secretKeeper, setSecret }}>
      {children}
    </SecretContext.Provider>
  );
};

// Custom hook to use the Secret context
export const useSecret = () => useContext(SecretContext);
