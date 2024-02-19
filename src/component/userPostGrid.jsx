import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import PostUserModal from "./postUserModal";

const UserPostGrid = ({ userAllPost }) => {
  const [postModal, setPostModal] = useState(false)

  
  return (
    <div> 
    <Box
      sx={{
        flexGrow: 1,
        // width: "1200px",
        height: "100%",
        // border: "1px solid green",
        margin:"auto"

      }}
    >
      <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"30px", }}>
        {userAllPost.length ? (
          userAllPost?.map((post, index) => {
            return (
              <div style={{height:"100%", width:"100%"}} key={`${post}${index}`}  onClick={()=> setPostModal(true)} >
                <div style={{height:"350px", width:"350px",padding:"10px", border:"1px solid #262626", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}}>
                <img style={{width:"100%", height:"100%"}} src={post.post}  />
              </div>
              </div>
            );
          })
        ) : (
         <Box sx={{fontSize:"25px", textAlign:"center",marginLeft:"370px", width:"100%"}}>
             <Typography sx={{fontSize:"25px", textAlign:"center", margin:"auto"}}>No Post</Typography>
         </Box>
        )}
      </div>
    </Box>
     {/* <PostUserModal  postModal={postModal} setPostModal = {setPostModal} /> */}
    </div>
  );
};

export default UserPostGrid;
