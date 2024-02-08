import {
  AppBar,
  Box,
  Divider,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PostCreate from "./PostCreate";

const Navbar = () => {
  const [createPostModal, setCreatePostModal] = useState(false);
  const handleOpen = () => setCreatePostModal(true);
  const handleClose = () => setCreatePostModal(false);
  return (
    <div>
    <Box className="Navbar">
      <div className="textSocial">
        <div>Social Sphere</div>
      </div>
      <div className="NavbarOtherSearch">
        <div className="SearchInput">
          <SearchIcon sx={{ color: "#f5f5f5" }} />
          <input placeholder="Search..." />
        </div>

        <div className="socialNavbar">
          <div className="messageIcon">
            <Tooltip arrow title="Message">
              <IconButton className="hovericon">
                <SendIcon sx={{ color: "#f5f5f5" }} />
              </IconButton>
            </Tooltip>
          </div>
          <div
            className="messageIcon"
            onClick={() => {
              handleOpen()
            }}
          >
            <Tooltip arrow title="Create Post">
              <IconButton className="hovericon">
                <AddCircleOutlineIcon sx={{ color: "#f5f5f5" }} />
              </IconButton>
            </Tooltip>
          </div>
          <div className="messageIcon">
            <Tooltip arrow title="Profile">
              <IconButton className="hovericon">
                <AccountCircleIcon sx={{ color: "#f5f5f5" }} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </Box>
      <PostCreate handleOpen= {createPostModal}  handleClose={ setCreatePostModal}  />
    </div>
  );
};

export default Navbar;
