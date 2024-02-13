// import React, { useContext, useEffect, useRef, useState } from "react";
// import { LoginContext } from "../context/loginContext";
// import Signup from "./signup";
// import "../css/signup.css";
// import { useNavigate } from "react-router-dom";

// export default function Home() {
//   const navigate = useNavigate();
//   // const { user } = useContext(LoginContext);
//   // const {  token = "" } = user || {};

//   useEffect(() => {
//     const token = JSON.parse(localStorage.getItem("userInfo"));
//     if (token) {
//       navigate("/post");
//     }else{
//       navigate("/")
//     }
//   }, []);
//   return (
//     <>
//       <Signup />
//     </>
//   );
// }
