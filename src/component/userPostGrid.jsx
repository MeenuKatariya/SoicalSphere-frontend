import React from "react";
import Grid from "@mui/material/Grid";
import { Box, Card, CardMedia, Typography } from "@mui/material";

const UserPostGrid = ({ userAllPost }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        height: "100%",
        // border: "1px solid green",
        margin:"auto"

      }}
    >
      <div style={{display:"grid", gridTemplateColumns:"auto auto auto auto", gap:"30px", }}>
        {userAllPost.length ? (
          userAllPost?.map((post, index) => {
            return (
              <div style={{height:"350px", width:"350px",padding:"10px", border:"1px solid #262626", boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"}}>
                <img style={{width:"100%", height:"100%"}} src={post.post}  />
              </div>
            );
          })
        ) : (
          <Typography>No Post</Typography>
        )}
      </div>
    </Box>
  );
};

export default UserPostGrid;
