import React, { useContext, useEffect } from "react";
import SideDrawer from "../component/SideDrawer";
import { Box, Card, Divider } from "@mui/material";
import PostCard from "../component/PostCard";
import MessageSearch from "../component/MessageSearch";
import { LoginContext } from "../context/loginContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import InfiniteScroll from "react-infinite-scroll-component";
import "../css/style.css";
import { Circles } from "react-loader-spinner";

const Post = () => {
  const { allPost, getPost, hasMore, user } = useContext(LoginContext);
  const {
    decoded: {
      id: loggedInUserId = "",
      name = "",
      username = "",
      bio = "",
      followers: { count: followersCount = 0 } = {},
      following: {
        count: followingCount = 0,
        list: loggedUserFollowingList = [],
      } = {},
      profilePicture = "",
    } = {},
    token = "",
  } = user || {};
  const navigate = useNavigate();
  

  return (
    <div className="postMainDiv">
      <Navbar />
      <Box className="postBox" style={{ overflowY: "hidden", width:"100%", position:"relative" }}>
        <InfiniteScroll
          dataLength={allPost.length}
          next={getPost}
          hasMore={hasMore}
          loader={<div style={{margin:'auto',marginTop:'10px', textAlign:"center", width:"40px"}}>
            <Circles  height="30"
          border="1px solid red"
          width="30"
          marginLeft="50"
          color="#f5f5f5"
          ></Circles>
          </div>}
          height={810}
          endMessage={<p  style={{fontSize:"16px", color:"#f2f2f2", fontStyle:"italic"}}>No more posts to load</p>}
        >
          <div style={{display:"flex", justifyContent:"space-between", width:"100%", flexDirection:"row",}}>
           <div style={{display: followersCount > 0 || followingCount > 0 ? "block" : "none"}}> <SideDrawer /></div>
            <div style={{width:"660px", paddingTop:"20px",paddingBottom:"20px", margin:"auto",border:"1px solid #262626", backgroundColor:"#121212"}}><PostCard /></div>
            {/* <MessageSearch /> */}
          </div>
        </InfiniteScroll>
      </Box>
    </div>
  );
};

export default Post;
