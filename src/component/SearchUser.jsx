import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Card,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loader from "./skeleton";

const SearchUser = ({
  searchResult,
  searchInput,
  setSearchInput,
  loading
}) => {
  const navigate = useNavigate();
  const [isVisibleCard, setIsVisibleCard] = useState(true);

  return (
    <div
      className="scrollingFollowers"
      style={{
        position: "absolute",
        zIndex: "10",
        left: "51.4%",
        height: "300px",
        width: "366px",
        overflowX: "hidden",
        overflowY: "scroll",
        scrollBehavior: "smooth",
        backgroundColor: "#262626",
        display: searchResult.length ? "block" : "none",
        display: searchInput && searchResult ? "block" : "none",
        borderRadius: "5px",
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
              {loading ? (
                <Loader />
              ) : (
                isVisibleCard && (
                  <Card
                    sx={{
                      bgcolor: "#262626",
                      textAlign: "left",
                      color: "#f5f5f5",
                      boxShadow: "none",
                      borderRadius: "0px",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#797D7F",
                      },
                    }}
                    onClick={() => {
                      setIsVisibleCard(false);
                      setSearchInput("");
                      navigate(`/profile/${id}`);
                    }}
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
                    <Divider />
                  </Card>
                )
              )}
            </div>
          );
        })
      ) : (
        <div style={{ color: "#f5f5f5", padding: "10px", textAlign: "center" }}>
          No Result Found
        </div>
      )}
    </div>
  );
};

export default SearchUser;
