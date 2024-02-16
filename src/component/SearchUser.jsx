import React from "react";
import {
  AppBar,
  Avatar,
  Card,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SearchUser = ({ searchResult, searchInput }) => {
    const navigate = useNavigate()

  return (
    <div
      style={{
        position: "absolute",
        left: "51.4%",
        top: "6%",
        height: "10px",
        width: "366px",
        backgroundColor: "#262626",
        display: searchResult.length ? "block" : "none",
        display: searchInput ? "block" : "none",
        borderRadius: "20px"
      }}
    >
      {searchResult.length ? (
        searchResult?.map((user) => {
          const {
            name = "",
            username = "",
            profilePicture = "",
            _id: id = "",
          } = user || {};
          const firstLetter = name.charAt(0).toUpperCase();
          const nameCapital = name.charAt(0).toUpperCase() + name.slice(1);
          return (
            <div key={id}>
              <Card
                sx={{
                  bgcolor: "#262626",
                  textAlign: "left",
                  color: "#f5f5f5",
                  boxShadow: "none",
                  borderRadius: "0px",
                  cursor: "pointer",
                }}
                onClick= {() => navigate(`/profile/${id}`)}
              >
                <CardHeader
                  avatar={
                    <Avatar alt={firstLetter} src={profilePicture}></Avatar>
                  }
                  title={<Typography variant="h6">{username}</Typography>}
                  subheader={
                    <Typography sx={{ fontSize: "15px" }}>
                      {nameCapital}
                    </Typography>
                  }
                />
                <Divider></Divider>
              </Card>
            </div>
          );
        })
      ) : (
        <div style={{ color: "#121212", padding: "10px", textAlign: "center" }}>
          No Results Found
        </div>
        
      )}
    
    </div>
  );
};

export default SearchUser;
