import React, { useState, useContext } from "react";
import { Circles } from "react-loader-spinner";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, TextField, Snackbar, Alert } from "@mui/material";
import { IoMdImages } from "react-icons/io";
import makeStyles from "@mui/styles/makeStyles";

import { LoginContext } from "../context/loginContext";
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

const ModalProfileUpdate = ({ editProfileModal, setEditProfileModal }) => {
  const classes = useStyles();
  const [pic, setPic] = useState();
  const [picloading, setPicLoading] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [updatedBio, setUpdatedBio] = useState("");
  const [updatedUserName, setUpdatedUserName] = useState("");
  const { user, setUser } = useContext(LoginContext);

  const {
    decode: {
      id: loggedInUserId = "",
      name = "",
      username = "",
      bio = "",
      profilePicture = "",

      followers: { count: followersCount = 0 } = {},
      following: { count: followingCount = 0 } = {},
    } = {},
    token = "",
  } = user || {};
  const firstLetter = name.charAt(0).toUpperCase();
  const nameCapital = name.charAt(0).toUpperCase() + name.slice(1);

  const postProfile = async () => {
    const updatedData = {
      name: updatedName,
      username: updatedUserName,
      profilePicture: pic,
      bio: updatedBio,
    };

    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key] == "") {
        delete updatedData[key];
      }
    });

    try {
      const data = await fetch("http://localhost:5000/updateProfile", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          token: token,
        },
        body: JSON.stringify(updatedData),
      });
      const res = await data.json();
      localStorage.setItem("userInfo", JSON.stringify(res));
      setUser([...user, res]);
    } catch (err) {
      console.log(err);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/dnksapkfi/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      setPicLoading(false);
      return;
    }
  };
  return (
    <div>
      <Modal
        open={editProfileModal.boolean}
        onClose={() => setEditProfileModal({ boolean: false })}
        sx={{ top: "20%", left: "40%" }}
      >
        <Box
          sx={{
            color: "#f5f5f5",
            bgcolor: "#262626",
            width: "500px",
            borderRadius: "7px",
            textAlign: "center",
            paddingTop: "10px",
            // height: "200px",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Profile
          </Typography>
          <Divider style={{ width: "100%", background: "#CCD0D5" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
              flexDirection: "column",
              margin: "auto",
              width: "300px",
              alignItems: "center",
              marginTop: "30px",
            }}
          >
            <TextField
              style={{
                display: editProfileModal.profilePic ? "none" : "block",
              }}
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              sx={{ input: { color: "#f5f5f5", width: "100%" } }}
              InputLabelProps={{
                sx: {
                  color: "#f5f5f5",
                },
              }}
              className={classes.root}
              fullWidth
              label="Name"
              variant="outlined"
            />
            <TextField
              style={{
                display: editProfileModal.profilePic ? "none" : "block",
              }}
              value={updatedUserName}
              onChange={(e) => setUpdatedUserName(e.target.value)}
              sx={{ input: { color: "#f5f5f5", width: "100%" } }}
              InputLabelProps={{
                sx: {
                  color: "#f5f5f5",
                },
              }}
              className={classes.root}
              fullWidth
              label="User Name"
              variant="outlined"
            />

            <TextField
              type="file"
              accept="image/*"
              onChange={(e) => {
                postDetails(e.target.files[0]);
              }}
              sx={{ input: { color: "#f5f5f5", width: "100%" } }}
              InputLabelProps={{
                sx: {
                  color: "#f5f5f5",
                },
              }}
              style={{
                display: editProfileModal.profilePic ? "block" : "none",
              }}
              className={classes.root}
              fullWidth
              variant="outlined"
            />
            <TextField
              style={{
                display: editProfileModal.profilePic ? "none" : "block",
              }}
              value={updatedBio}
              onChange={(e) => setUpdatedBio(e.target.value)}
              sx={{ input: { color: "#f5f5f5", width: "100%" } }}
              InputLabelProps={{
                sx: {
                  color: "#f5f5f5",
                },
              }}
              className={classes.root}
              fullWidth
              label="Bio"
              variant="outlined"
            />

            {picloading ? (
              <div style={{ marginLeft: "15px", marginBottom: "20px" }}>
                <Circles
                  height="20"
                  border="1px solid red"
                  width="20"
                  //   left="50"
                  color="#f5f5f5"
                  ariaLabel="circles-loading"
                  visible={picloading}
                />
              </div>
            ) : (
              <button
                onClick={() => {
                  postProfile();
                }}
                style={{
                  border: "1px solid #f5f5f5",
                  color: "#f5f5f5",
                  backgroundColor: "#262626",
                  padding: "10px 20px 10px 20px",
                  fontSize: "15px",
                  marginBottom: "20px",
                  borderRadius: "5px",
                  display: picloading ? "none" : "inline",
                }}
              >
                Upload
              </button>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalProfileUpdate;
