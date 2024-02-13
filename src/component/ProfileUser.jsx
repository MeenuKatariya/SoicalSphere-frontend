import {
  Modal,
  Box,
  Typography,
  Divider,
  Card,
  CardHeader,
  Avatar,
  Button,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import SideDrawer from "./SideDrawer";
import MessageSearch from "./MessageSearch";
import { LoginContext } from "../context/loginContext";
import makeStyles from "@mui/styles/makeStyles";
import EditIcon from "@mui/icons-material/Edit";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ModalProfileUpdate from "./ModalProfileUpdate";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      width: "25ch",
    },
    "& label.Mui-focused": {
      color: "#f5f5f5",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#f5f5f5",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#f5f5f5",
      },
      "&:hover fieldset": {
        borderColor: "#f5f5f5",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#f5f5f5",
      },
    },
  },
}));
const ProfileUser = ({ profileModal, setProfileModal }) => {
  const [editProfileModal, setEditProfileModal] = useState({
    profilePic: false,
    boolean: false,
  });
  const { user } = useContext(LoginContext);

  const {
    decode: {
      id: loggedInUserId = "",
      name = "",
      username = "",
      bio = "",
      followers: { count: followersCount = 0 } = {},
      following: { count: followingCount = 0 } = {},
    } = {},
    token = "",
  } = user || {};
  const firstLetter = name.charAt(0).toUpperCase();
  const nameCapital = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div
      style={{ backgroundColor: "#121212", height: "100vh", color: "#f5f5f5" }}
    >
      <Navbar />
      <ModalProfileUpdate
        editProfileModal={editProfileModal}
        setEditProfileModal={setEditProfileModal}
      />
      <Box className="postBox">
        <SideDrawer />

        <div style={{ width: "500px" }}>
          <div
            style={{
              display: "flex",
              textAlign: "center",
              margin: "auto",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              className="imageUpdate"
              style={{
                height: "150px",
                width: "150px",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <Avatar
                alt={firstLetter}
                src="/static/images/avatar/1.jpg"
                sx={{
                  height: "100%",
                  width: "100%",
                  color: "#262626",
                  fontSize: "40px",
                  fontWeight: "500",
                }}
              ></Avatar>
              <div
                onClick={() =>
                  setEditProfileModal({ profilePic: true, boolean: true })
                }
                className="hoverIcon"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#262626",
                  top: "0%",
                  borderRadius: "50%",
                }}
              >
                <div
                  style={{
                    marginTop: "50px",
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                >
                  <AddAPhotoIcon sx={{ width: "40px", height: "100%" }} />
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "240px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">{nameCapital}</Typography>
                <Typography
                  sx={{
                    // border: "1px solid #f5f5f5",
                    color: "#3b82f680",
                    textTransform: "none",
                    cursor: "Pointer",
                  }}
                  onClick={() =>
                    setEditProfileModal({ profilePic: false, boolean: true })
                  }
                >
                  Edit Profile
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <Typography>2post</Typography>
                <Typography>{followersCount} Followers</Typography>
                <Typography>{followingCount} Following</Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                  marginTop: "15px",
                }}
              >
                <Typography>{username}</Typography>
                <Typography>{bio}</Typography>
              </div>
            </div>
          </div>
          <Divider sx={{ bgColor: "#f5f5f5" }}></Divider>
        </div>
        <MessageSearch />
      </Box>
    </div>
  );
};

export default ProfileUser;
