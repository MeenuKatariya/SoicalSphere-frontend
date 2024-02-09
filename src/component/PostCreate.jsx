import React, { useContext, useState } from "react";
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

const PostCreate = ({ handleOpen, handleClose }) => {
  const classes = useStyles();
  const { user } = useContext(LoginContext);
  const [pic, setPic] = useState();
  const [picloading, setPicLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [postCreateSuccess, setPostCreateSuccess] = useState(false);
  const { token = {}, decode: { id: userId = "" } = {} } = user || {};

  const [state, setState] = useState({
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal } = state;
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setPostCreateSuccess(false);
  };

  const postCreate = async () => {
    if (!pic || !caption) {
      setPostCreateSuccess(false);
      return;
    }

    const postData = {
      userId: userId,
      post: pic,
      caption: caption,
    };

    try {
      await fetch("http://localhost:5000/addPost", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          token: token,
        },
        body: JSON.stringify(postData),
      });
      setPostCreateSuccess(true);
      setCaption("");
      setPic("");
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
      <Snackbar
        open={postCreateSuccess}
        autoHideDuration={2000}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Post Created Sucessfully
        </Alert>
      </Snackbar>
      <Modal
        sx={{
          top: 130,
          width: "700px",
          margin: "auto",
        }}
        open={handleOpen}
        onClose={() => {
          handleClose(false);
          setPostCreateSuccess(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="createPostModal">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create new post
          </Typography>
          <Divider style={{ width: "100%", background: "#CCD0D5" }} />
          <div className="ImageIcon">
            <IoMdImages />
          </div>
          <div>
            <input
              className="custom-file-input"
              type="file"
              accept="image/*"
              onChange={(e) => {
                postDetails(e.target.files[0]);
              }}
            />

            <div
              style={{
                width: "340px",
                alignItems: "center",
                margin: "auto",
                marginTop: "30px",
              }}
            >
              <TextField
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                sx={{ input: { color: "#f5f5f5" } }}
                InputLabelProps={{
                  sx: {
                    color: "#f5f5f5",
                  },
                }}
                className={classes.root}
                fullWidth
                label=" Add Caption"
                variant="outlined"
              />
            </div>
            <Button
              onClick={() => postCreate()}
              variant="outlined"
              sx={{
                border: "1px solid #f5f5f5",
                marginTop: "25px",
                color: "#f5f5f5",
                ":hover": {
                  borderColor: " #f5f5f5",
                },
              }}
            >
              Upload
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PostCreate;
