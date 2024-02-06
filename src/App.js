import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
// import Home from "./page/Home";
import { Route, Routes } from "react-router-dom";
import Post from "./page/Post";
import Signup from "./page/signup";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Signup} exact />
        <Route path="/post" Component={Post} />
      </Routes>
    </>
  );
}
