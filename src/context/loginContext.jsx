import React, { createContext, useEffect, useState } from "react";

export const LoginContext = createContext();

export function LoginContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const { token } = JSON.parse(localStorage.getItem("userInfo"));

  const checkUser = async (token) => {
    try {
      if (token) {
        let res = await fetch("http://localhost:5000/checkUserByToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });
        let data = await res.json();

        if (data.token) {
          setUser(data.token);
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser(token);
  }, []);

  return (
    <LoginContext.Provider value={{ user }}>
      {children}
    </LoginContext.Provider>
  );
}
