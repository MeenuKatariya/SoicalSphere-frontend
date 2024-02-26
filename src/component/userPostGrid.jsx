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
        width: "1200px",
        height: "1005",
        // border: "1px solid green",
        margin:"auto"

      }}
    >
      <div style={{display:"flex", justifyContent:"space-between", gap:"30px", flexDirection:"row", flexWrap:"wrap"}}>
        {userAllPost.length ? (
          userAllPost?.map((post, index) => {
            return (
              <div  key={`${post}${index}`}  onClick={()=> setPostModal(true)} >
                <div className="gripPostImage" style={{}}>
                <img style={{width:"100%", height:"100%"}} src={post.post}  />
              </div>
              </div>
            );
          })
        ) : (
         <Box sx={{fontSize:"25px", textAlign:"center", width:"100%", height:"100%"}}>
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
