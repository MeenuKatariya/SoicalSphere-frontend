import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const LoginContext = createContext();

export function LoginContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    token: "",
    decoded: {},
  });
  const [allPost, setAllPost] = useState([]);
  const { token } = JSON.parse(localStorage.getItem("userInfo")) || [];

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
          setUser({ token: data.token, decode: data.decoded });
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPost = async () => {
    try {
      if (token) {
        const data = await fetch("http://localhost:5000/allPost");
        const res = await data.json();
        setAllPost(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkUser(token);
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    getPost();
  }, [token]);
  
  return (
    <LoginContext.Provider value={{ user, allPost, setAllPost, setUser }}>
      {children}
    </LoginContext.Provider>
  );
}
