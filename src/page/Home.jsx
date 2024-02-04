import * as React from "react";
import { useState } from "react";
import Signup from "./signup";
import "../css/signup.css";
import { Route, Routes } from "react-router-dom";
export default function Home() {
  return (
    <>
      <Routes>
        <Route path="/auth" Component={Signup} />
      </Routes>
    </>
  );
}
