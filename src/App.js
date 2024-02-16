import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Route, Routes } from "react-router-dom";
import Post from "./page/Post";
import React, { useContext, useState } from "react";
import Signup from "./page/signup";
import ProfileUser from "./component/ProfileUser";
import { useNavigate } from "react-router-dom";
import Home from "./page/Home";
import { LoginContext } from "./context/loginContext";
import ChatBox from "./component/ChatBox";

export default function App() {
  const navigate = useNavigate();
  const { user } = useContext(LoginContext);
  const { token = "" } = user || {};

  return (
    <>
      <Routes>
        {token && <Route path="/post" Component={Post} />}
        {!token && <Route path="/" Component={Signup} exact />}
        {token && <Route path="/profile/:id" Component={ProfileUser} />}
        {token && <Route path="/chat" Component={ChatBox} />}
      </Routes>
    </>
  );
}
