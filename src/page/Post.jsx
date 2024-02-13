import React, { useContext, useEffect } from "react";
import SideDrawer from "../component/SideDrawer";
import { Box, Card, Divider } from "@mui/material";
import PostCard from "../component/PostCard";
import MessageSearch from "../component/MessageSearch";
import { LoginContext } from "../context/loginContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import "../css/style.css";

const Post = () => {
  const { user } = useContext(LoginContext);
  const { token = "" } = user || {};
  const navigate = useNavigate();
    
 
  return (
    <div className="postMainDiv">
       <Navbar />
      <Box className="postBox">
         <SideDrawer />
         <PostCard />
         <MessageSearch />
      </Box>
    </div>
  );
};

export default Post;
