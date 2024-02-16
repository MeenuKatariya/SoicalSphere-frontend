import React, { createContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
export const LoginContext = createContext();

export function LoginContextProvider({ children }) {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
  const [start, setStart] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const count = 5;
  const [user, setUser] = useState({
    token: "",
    decoded: {},
  });
  const [allPost, setAllPost] = useState([]);
  const { token } = JSON.parse(localStorage.getItem("userInfo")) || [];

  const checkUser = async (token) => {
    try {
      if (token) {
        let res = await fetch("http://localhost:5000/user/checkUserByToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });
        let data = await res.json();
        if (data.token) {
          setUser({ token: data.token, decoded: data.decoded });
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
        const data = await fetch(
          `http://localhost:5000/post/allPost?start=${start}&count=${count}`
        );
        const res = await data.json();
        setAllPost(res);
        // console.log(res);
        if (res.length === 0) {
          setHasMore(false);
          return;
        }

        setStart((prevPage) => prevPage + 1);
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
    <LoginContext.Provider
      value={{
        user,
        allPost,
        setAllPost,
        setUser,
        getPost,
        hasMore,
        selectedChat,
        setSelectedChat,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
