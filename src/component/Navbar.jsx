import {
  AppBar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PostCreate from "./PostCreate";
import ProfileUser from "./ProfileUser";

const Navbar = () => {
  const [createPostModal, setCreatePostModal] = useState(false);
  const [ profileModal, setProfileModal] = useState(false);
  const handleOpen = () => setCreatePostModal(true);
  const [modalProfileLogout, setModalProfileLogout] = useState(false);
  const handleClose = () => setCreatePostModal(false);

  
  return (
    <div>
      <Modal
        open={modalProfileLogout}
        sx={{
          width: "100px",
          height: "100x",
          left: "92%",
          top: "8%",
          border: "none",
        }}
        onClose={() => setModalProfileLogout(false)}
      >
        <Box
          sx={{
            bgcolor: "#262626",
            color: "#f5f5f5",
            textAlign: "center",
            borderRadius: "5px",
          }}
        >
          <List sx={{ textAlign: "center" }}>
            <ListItem disablePadding>
              <ListItemButton  >
                <ListItemText
                onClick={() => {setProfileModal(true)}}
                  primary="Profile"
                  sx={{ cursor: "pointer", textAlign: "center" }}
                />
              </ListItemButton>
            </ListItem>
            <Divider style={{ backgroundColor: "#262626" }} />
            <ListItem disablePadding>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText
                  primary="Logout"
                  sx={{ cursor: "pointer", textAlign: "center" }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Modal>
      <Box className="Navbar">
        <div className="textSocial">
          <div>Social Sphere</div>
        </div>
        <div className="NavbarOtherSearch">
          <div className="SearchInput">
            <SearchIcon sx={{ color: "#f5f5f5", cursor: "pointer" }} />
            <input
              placeholder="Search..."
              style={{ borderBottom: "1px solid #f5f5f5" }}
            />
          </div>

          <div className="socialNavbar">
            <div className="messageIcon">
              <Tooltip arrow title="Message">
                <IconButton className="hovericon">
                  <SendIcon sx={{ color: "#f5f5f5", cursor: "pointer" }} />
                </IconButton>
              </Tooltip>
            </div>
            <div
              className="messageIcon"
              onClick={() => {
                handleOpen();
              }}
            >
              <Tooltip arrow title="Create Post">
                <IconButton className="hovericon">
                  <AddCircleOutlineIcon
                    sx={{ color: "#f5f5f5", cursor: "pointer" }}
                  />
                </IconButton>
              </Tooltip>
            </div>
            <div className="messageIcon">
              <Tooltip arrow title="Profile">
                <IconButton className="hovericon">
                  <AccountCircleIcon
                    onClick={() => setModalProfileLogout(true)}
                    sx={{ color: "#f5f5f5", cursor: "pointer" }}
                  />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </Box>
      <PostCreate
        handleOpen={createPostModal}
        handleClose={setCreatePostModal}
      />
      <ProfileUser profileModal={profileModal} setProfileModal={setProfileModal} />
    </div>
  );
};

export default Navbar;
