import React, { useContext } from "react";

import { LoginContext } from "../context/loginContext";
import { Avatar, Box, Card, CardHeader, Typography } from "@mui/material";

const SideDrawer = () => {
  const { user } = useContext(LoginContext);
  console.log(user);
  const {
    decoded: {
      id: loggedInUserId = "",
      name = "",
      username = "",
      bio = "",
      followers: { count: followersCount = 0, list: followersList = [] } = {},
      following: { count: followingCount = 0, list: followingList = [] } = {},
    } = {},
    token = "",
  } = user || {};
  console.log(followersList);
  const firstLetter = name.charAt(0).toUpperCase();
  const nameCapital = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <div
      style={{
        border: "1px solid #262626",
        display: "flex",
        flexDirection: "column",
        width: "450px",
      }}
    >
      <div
        style={{
          padding: "20px",
          fontSize: "20px",
          textAlign: "left",
          overflow: "hidden",
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
              const { name, profilePicture, username } = followedUser || {};
              console.log(name);
              const firstLetter = name.charAt(0).toUpperCase();
              const nameCapital = name.charAt(0).toUpperCase() + name.slice(1);
              return (
                <Box sx={{ color: "#f5f5f5" }}>
                  <Card
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

      <div style={{ padding: "20px", fontSize: "20px", textAlign: "left" }}>
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
              const { name, profilePicture, username } = followingUser || {};
              console.log(name);
              const firstLetter = name.charAt(0).toUpperCase();
              const nameCapital = name.charAt(0).toUpperCase() + name.slice(1);
              return (
                <Box sx={{ color: "#f5f5f5" }}>
                  <Card
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
