import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
// import Home from "./page/Home";
import { Route, Routes } from "react-router-dom";
import Post from "./page/Post";
import React, { useContext, useState } from "react";
import Signup from "./page/signup";
import { LoginContext } from "./context/loginContext";
import ProfileUser from "./component/ProfileUser";

export default function App() {
  const { user } = useContext(LoginContext);
  const { token = {}, decode: { id: userId = "", name = "" } = {} } = user || {};
  console.log(name)

  return (
    <>
      <Routes>
        <Route path="/" Component={Signup} exact />
        <Route path="/post" Component={Post} />
        <Route path={name} Component={ProfileUser} />
      </Routes>
    </>
  );
}
