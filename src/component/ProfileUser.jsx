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
import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { LoginContext } from "../context/loginContext";
import makeStyles from "@mui/styles/makeStyles";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ModalProfileUpdate from "./ModalProfileUpdate";
import UserPostGrid from "./userPostGrid";
import { useNavigate } from "react-router-dom";

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
  const [loadingChat, setLoadingChat] = useState(false);
  const navigate = useNavigate();
  const [editProfileModal, setEditProfileModal] = useState({
    profilePic: false,
    boolean: false,
  });
  const [userNotLoggedInData, setUserNotLoggedInData] = useState({});
  const [userAllPost, setUserAllPost] = useState([]);
   const [countUserPost , setCountUserPost] = useState(0)
  const { user, setUser, setSelectedChat, chats, setChats } =
    useContext(LoginContext);
  const {
    decoded: {
      id: loggedInUserId = "",
      name = "",
      username = "",
      bio = "",
      followers: { count: followersCount = 0 } = {},
      following: {
        count: followingCount = 0,
        list: loggedUserFollowingList = [],
      } = {},
      profilePicture = "",
    } = {},
    token = "",
  } = user || {};
  console.log(user)
  const firstLetter = name.charAt(0).toUpperCase();
  const nameCapital = name.charAt(0).toUpperCase() + name.slice(1);
  const id = window.location.pathname;
  const idNotLoggedIn = id.split("/").slice(2).join("");

  const {
    _id: userId = "",
    name: nameUser = "",
    username: userName = "",
    bio: userBio = "",
    followers: {
      count: followersCountUser = 0,
      list: followersListUserNotLoggedIn = [],
    } = {},
    following: {
      count: followingCountUser = 0,
      list: followingListUserNotLoggedIn = [],
    } = {},
    profilePicture: profilePictureUser = "",
  } = userNotLoggedInData || {};
  const firstLetterUser = nameUser.charAt(0).toUpperCase();
  const nameUserCapital = nameUser.charAt(0).toUpperCase() + nameUser.slice(1);

  const userNotLoggedIn = async () => {
    try {
      if (loggedInUserId !== idNotLoggedIn) {
        const data = await fetch(
          `http://localhost:5000/user/profile/${idNotLoggedIn}`
        );
        const res = await data.json();
        setUserNotLoggedInData(res);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const userPost = async () => {
    try {
      if (loggedInUserId !== idNotLoggedIn) {
        const data = await fetch(
          `http://localhost:5000/post/userPost/${idNotLoggedIn}`
        );
        const res = await data.json();
        console.log(res)
         setCountUserPost( res.length)
        setUserAllPost(res);
      } else {
        console.log("no");
        const data = await fetch(
          `http://localhost:5000/post/userPost/${loggedInUserId}`
        );
        const res = await data.json();
          setCountUserPost(res.length)
        setUserAllPost(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userNotLoggedIn();
    userPost();
  }, []);

  const followUser = async (userId) => {
    try {
      await fetch(`http://localhost:5000/user/followUser/${userId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          token: token,
        },
      });
      const userNotLoggedInDataUpdated = { ...userNotLoggedInData };
      const { followers: { list: followerUserList = [] } = {} } =
        userNotLoggedInDataUpdated || {};
      userNotLoggedInDataUpdated.followers.list = [
        ...followerUserList,
        loggedInUserId,
      ];
      userNotLoggedInDataUpdated.followers.count = followerUserList.length + 1;
      setUserNotLoggedInData(userNotLoggedInDataUpdated);

      const updatedUser = { ...user } || {};
      const {
        decoded: { following: { list: loggedFollowingList = [] } = {} } = {},
      } = updatedUser || {};
      updatedUser.decoded.following.list = [...loggedFollowingList, userId];
      updatedUser.decoded.following.count = loggedFollowingList + 1;
      setUser(updatedUser);
      console.log("follow", updatedUser);
    } catch (err) {
      console.log(err);
    }
  };
  const unFollowUser = async (userId) => {
    try {
      await fetch(`http://localhost:5000/user/unFollow/${userId}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          token: token,
        },
      });
      const userNotLoggedInDataUpdated = { ...userNotLoggedInData };
      const { followers: { list: followerUserList = [] } = {} } =
        userNotLoggedInDataUpdated || {};
      const updatedFollowerList = followerUserList?.filter(
        (userId) => userId !== loggedInUserId
      );
      userNotLoggedInDataUpdated.followers.list = [updatedFollowerList];
      userNotLoggedInDataUpdated.followers.count = updatedFollowerList.length;
      setUserNotLoggedInData(userNotLoggedInDataUpdated);

      const updatedUser = { ...user } || {};
      const {
        decoded: { following: { list: loggedFollowingList = [] } = {} } = {},
      } = updatedUser || {};
      const updatedFollowingList = loggedFollowingList?.filter(
        (userId) => userId !== idNotLoggedIn
      );
      updatedUser.decoded.following.list = updatedFollowingList;
      updatedUser.decoded.following.count = updatedFollowingList.length;
      setUser(updatedUser);

      console.log("unfollow", updatedUser);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(countUserPost)

  return (
    <>
     
      <Navbar />
      <ModalProfileUpdate
        editProfileModal={editProfileModal}
        setEditProfileModal={setEditProfileModal}
      />
       <div style={{backgroundColor:"#121212", color:"#f5f5f5" , paddingBottom:"50px"} }>

      {idNotLoggedIn !== loggedInUserId ? (
        userNotLoggedInData && (
          <Box
            className="postBox"
            style={{
              display: "flex",
              gap: "80px",
              flexDirection: "column",
              width: "1200px",
             backgroundColor:"#121212",
              margin: "auto",
            }}
          >
            <div style={{ width: "500px",  marginTop: "100px" }}>
              <div
                style={{
                  display: "flex",
                  textAlign: "center",
                  // margin: "auto",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  // border: "1px solid red",
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
                    alt={firstLetterUser}
                    src={profilePictureUser}
                    sx={{
                      height: "100%",
                      width: "100%",
                      color: "#262626",
                      fontSize: "40px",
                      fontWeight: "500",
                    }}
                  ></Avatar>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "250px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{ fontSize: "22px", paddingTop: "3px" }}
                      variant="h6"
                    >
                      {nameUserCapital}
                    </Typography>
                    {!followersListUserNotLoggedIn.includes(loggedInUserId) ? (
                      <Button
                        variant="text"
                        sx={{
                          // border: "1px solid #f5f5f5",
                          color: "#0095f6",
                          textTransform: "none",
                          cursor: "Pointer",
                          fontSize: "15px",
                          fontWeight: "500",
                          // borderRadius: "10px",
                        }}
                        onClick={() => followUser(userId)}
                      >
                        Follow
                      </Button>
                    ) : (
                      <Button
                        variant="text"
                        sx={{
                          // border: "1px solid #f5f5f5",
                          color: "#0095f6",
                          textTransform: "none",
                          cursor: "Pointer",
                          fontSize: "15px",
                          fontWeight: "500",
                          // borderRadius: "10px",
                        }}
                        onClick={() => unFollowUser(userId)}
                      >
                        Unfollow
                      </Button>
                    )}
                    {/* <Button
                      variant="text"
                      sx={{
                        // border: "1px solid #f5f5f5",
                        color: "#0095f6",
                        textTransform: "none",
                        cursor: "Pointer",
                        fontSize: "15px",
                        fontWeight: "500",
                        borderRadius: "10px",
                      }}
                      onClick={() =>
                        // navigate("/chat")
                        accessChat(userId)
                      }
                    >
                      Message
                    </Button> */}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: "10px",
                    }}
                  >
                    <Typography>
                      {countUserPost} <span>Post</span>
                    </Typography>
                    <Typography>
                      {followersCountUser}
                      <span> Followers</span>
                    </Typography>
                    <Typography>
                      {followingCountUser}
                      <span> Following</span>
                    </Typography>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "left",
                      marginTop: "15px",
                    }}
                  >
                    <Typography>{userName}</Typography>
                    <Typography>{userBio}</Typography>
                  </div>
                </div>
              </div>
            </div>
            <Divider sx={{ bgcolor: "#262626" }} />
            <div>
              <UserPostGrid userAllPost={userAllPost} />
            </div>
          </Box>
        )
      ) : (
        //    })

        // Logged In User

        <Box
          className="postBox"
          style={{
            display: "flex",
            gap: "80px",
            flexDirection: "column",
            width: "1200px",
            margin: "auto",
          }}
        >
          <div style={{ width: "500px", marginTop: "100px" }}>
            <div
              style={{
                display: "flex",
                textAlign: "center",
                margin: "auto",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                // border: "1px solid red",
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
                  src={profilePicture}
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
                      marginLeft: "8px",
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
                  width: "250px",
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
                  <Typography>
                    {countUserPost} <span>Post</span>
                  </Typography>
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
            {/* <Divider sx={{ color: "#f5f5f5" }}/> */}
          </div>
          <Divider sx={{ bgcolor: "#262626" }} />
          <div>
            <UserPostGrid userAllPost={userAllPost} />
          </div>
        </Box>
      )}
      </div>
     </>
  );
 
};

export default ProfileUser;
