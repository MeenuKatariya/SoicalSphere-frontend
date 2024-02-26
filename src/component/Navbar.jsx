import {
  AppBar,
  Avatar,
  Box,
  Card,
  CardHeader,
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
  Typography,
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PostCreate from "./PostCreate";
import ProfileUser from "./ProfileUser";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/loginContext";
import SearchUser from "./SearchUser";

const Navbar = () => {
  const [createPostModal, setCreatePostModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { user, setUser } = useContext(LoginContext);
  const [hamburger, setHamburger] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchHamburger, setSearchHamburger] = useState(false);

  const [debounceTimer, setDebounceTimer] = useState(null);
  const {
    decoded: { id: loggedInUserId = "", username = "" } = {},
    token = "",
  } = user || {};
  const [profileModal, setProfileModal] = useState(false);
  const handleOpen = () => setCreatePostModal(true);
  const [modalProfileLogout, setModalProfileLogout] = useState(false);
  const handleClose = () => setCreatePostModal(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  const searchApi = async () => {
    try {
      setLoading(true);
      const data = await fetch(
        `http://localhost:5000/user?search=${searchInput}`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            token: token,
          },
        }
      );
      const res = await data.json();
      setSearchResult(res);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Box className="Navbar">
        <div className="textSocial">
          <div
            className="SocialSphereText"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/post")}
          >
            Social Sphere
          </div>
          <div className="hamburger1">
            <RxHamburgerMenu
              style={{ fontSize: "25px" }}
              onClick={() => setHamburger(true)}
            />
            {hamburger ? (
              <div className="hamburger">
                <div
                  className="burger burger1"
                  onClick={() => setSearchHamburger(true)}
                >
                  Search
                </div>

                <Divider />
                <div
                  className=" burger burger2"
                  onClick={() => {
                    handleOpen();
                    setHamburger(false);
                  }}
                >
                  {" "}
                  Create Post
                </div>
                <Divider />
                <div
                  className=" burger burger3"
                  onClick={() => {
                    navigate(`/profile/${loggedInUserId}`);
                    setModalProfileLogout(false);
                  }}
                >
                  Profile
                </div>
                <Divider />
                <div
                  className=" burger burger3"
                  onClick={() => {
                    localStorage.removeItem("userInfo");
                    setModalProfileLogout(false);
                    setUser({ token: "", decoded: {} });
                    navigate("/");
                  }}
                >
                  Logout
                </div>
                <Divider />
              </div>
            ) : null}
          </div>
        </div>

        <div className="NavbarOtherSearch">
          <div className="SearchInput">
            <input
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                clearTimeout(debounceTimer);
                const newTimer = setTimeout(() => {
                  searchApi();
                }, 300);

                setDebounceTimer(newTimer);
              }}
              placeholder="Search..."
            />
            <SearchIcon sx={{ color: "#f5f5f5", cursor: "pointer" }} />
            <SearchUser
              searchResult={searchResult}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              loading={loading}
            />
          </div>

          <div className="socialNavbar">
            <div
              className="messageIcon"
              onClick={() => {
                handleOpen();
              }}
            >
              <Tooltip arrow title="Create Post">
                <IconButton>
                  <AddCircleOutlineIcon
                    sx={{ color: "#f5f5f5", cursor: "pointer" }}
                  />
                </IconButton>
              </Tooltip>
            </div>
            <div
              className="messageIcons"
              onClick={() => setModalProfileLogout(true)}
            >
              <Tooltip arrow title="Profile">
                <IconButton>
                  <AccountCircleIcon
                    sx={{
                      color: "#f5f5f5",
                      cursor: "pointer",
                      position: "absolute",
                    }}
                  />
                  <div
                    style={{
                      width: "80px",
                      height: "80x",
                      top: "30px",
                      border: "none",
                      position: "absolute",
                      display: modalProfileLogout || null,
                      display: !modalProfileLogout ? "none" : null,
                    }}
                    onClick={() => setModalProfileLogout(false)}
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
                          <ListItemButton>
                            <ListItemText
                              onClick={() => {
                                navigate(`/profile/${loggedInUserId}`);
                                setModalProfileLogout(false);
                              }}
                              primary="Profile"
                              sx={{ cursor: "pointer", textAlign: "center" }}
                            />
                          </ListItemButton>
                        </ListItem>
                        <Divider style={{ backgroundColor: "#262626" }} />
                        <ListItem disablePadding>
                          <ListItemButton component="a">
                            <ListItemText
                              onClick={() => {
                                localStorage.removeItem("userInfo");
                                setModalProfileLogout(false);
                                setUser({ token: "", decoded: {} });
                                navigate("/");
                              }}
                              style={{ cursor: "pointer", textAlign: "center" }}
                            >
                              {" "}
                              Logout
                            </ListItemText>
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </Box>
                  </div>
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
      {/* <div style={{}}>
           {
                   searchHamburger?  <div className="SearchInput">
                   <input
                     value={searchInput}
                     onChange={(e) => {
                       setSearchInput(e.target.value);
                       clearTimeout(debounceTimer);
                       const newTimer = setTimeout(() => {
                         searchApi();
                       }, 300);
       
                       setDebounceTimer(newTimer);
                     }}
                     placeholder="Search..."
                   />
                   <SearchIcon sx={{ color: "#f5f5f5", cursor: "pointer" }} />
                   <SearchUser
                     searchResult={searchResult}
                     searchInput={searchInput}
                     setSearchInput={setSearchInput}
                     loading={loading}
                   />
                 </div> : null
                }
           </div> */}
    </div>
  );
};

export default Navbar;
