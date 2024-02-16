import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/loginContext";
import { Avatar, Box, Card, CardHeader, Typography } from "@mui/material";

const SideDrawer = () => {
  const navigate = useNavigate();
  const { user } = useContext(LoginContext);
  const {
    decoded: {
      id: loggedInUserId = "",
      name = "",
      username = "",
      followers: { count: followersCount = 0, list: followersList = [] } = {},
      following: { count: followingCount = 0, list: followingList = [] } = {},
    } = {},
    token = "",
  } = user || {};
  console.log(user)
  const firstLetter = name.charAt(0).toUpperCase();
  const nameCapital = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <div
      style={{
        // border: "1px solid #262626",
        display: "flex",
        flexDirection: "column",
        width: "450px",
        position:"relative"
      }}
    >
      <div
        style={{
          padding: "20px",
          fontSize: "20px",
          textAlign: "left",
          overflow: "hidden",
          position:'sticky',
            top:"0px"
        }}
      >
        Followers
        <div
          className="scrollingFollowers"
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            marginTop: "20px",
            height: "290px",
            overflowX: "hidden",
            overflowY: "scroll",
            scrollBehavior: "smooth",
            cursor: "pointer",
            
          }}
        >
          {followersList.length ? (
            followersList?.map((followedUser) => {
              const { name  = "", profilePicture = "", username = "", _id:id = "" } = followedUser || {};
              const firstLetter = name.charAt(0).toUpperCase();
              const nameCapital = name.charAt(0).toUpperCase() + name.slice(1);
              return (
                <Box sx={{ color: "#f5f5f5" }} key={`${name} ${id}`}>
                  <Card  
                  onClick={()=> navigate(`/profile/${id}`)}
                    sx={{
                      maxWidth: "100%",
                      bgcolor: "#262626",
                      textAlign: "left",
                      color: "#f5f5f5",
                      boxShadow: "none",
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar alt={firstLetter}   src={profilePicture}></Avatar>
                      }
                      title={
                        <Typography variant="h6">{nameCapital}</Typography>
                      }
                      subheader={<Typography>{username}</Typography>}
                    ></CardHeader>
                  </Card>
                </Box>
              );
            })
          ) : (
            <div>Suggestion followers</div>
          )}
        </div>
      </div>

      <div style={{ padding: "20px", fontSize: "20px", textAlign: "left",   position:'sticky',
            top:"375px" }}>
        Following
        <div
          className="scrollingFollowers"
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            marginTop: "20px",
            height: "290px",
            overflowX: "hidden",
            overflowY: "scroll",
            scrollBehavior: "smooth",
            cursor: "pointer",
          }}
        >
          {followingList.length ? (
            followingList?.map((followingUser) => {
              const { name = "", profilePicture = "", username = "", _id : id="" } = followingUser || {};
              const firstLetter = name.charAt(0).toUpperCase();
              const nameCapital = name.charAt(0).toUpperCase() + name.slice(1);
              return (
                <Box sx={{ color: "#f5f5f5" }} key={`${name} ${id}`} >
                  <Card 
                   onClick={()=> navigate(`/profile/${id}`)}
                    sx={{
                      maxWidth: "100%",
                      bgcolor: "#262626",
                      textAlign: "left",
                      color: "#f5f5f5",
                      boxShadow: "none",
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar alt={firstLetter} src={profilePicture}></Avatar>
                      }
                      title={
                        <Typography variant="h6">{nameCapital}</Typography>
                      }
                      subheader={<Typography>{username}</Typography>}
                    ></CardHeader>
                  </Card>
                </Box>
              );
            })
          ) : (
            <div>Suggestion followers</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
