import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, TextField } from "@mui/material";
import { IoMdImages } from "react-icons/io";
import makeStyles from "@mui/styles/makeStyles";
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

const PostCreate = ({ handleOpen }) => {
  const classes = useStyles();
  const [pic, setPic] = useState();
  const [picloading, setPicLoading] = useState(false);

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      //   toast({
      //     title: "Please Select an Image!",
      //     status: "warning",
      //     duration: 5000,
      //     isClosable: true,
      //     position: "bottom",
      //   });
      //   return;
    }
    console.log(pics);
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
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      //   toast({
      //     title: "Please Select an Image!",
      //     status: "warning",
      //     duration: 5000,
      //     isClosable: true,
      //     position: "bottom",
      //   });
      setPicLoading(false);
      return;
    }
  };
  console.log(handleOpen);
  return (
    <div>
      <Modal
        sx={{
          top: 130,
          width: "700px",
          margin: "auto",
        }}
        open={handleOpen}
        onClose={!handleOpen}
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
          <div className="modalInputDiv">
            <TextField
              type="file"
              accept="image/*"
              sx={{ bgcolor: "#f5f5f5", borderRadius: "5px" }}
              onChange={(e) => {
                postDetails(e.target.files[0]);
              }}
            />
            <br />
            <div
              style={{
               
                width: "330px",
                alignItems: "center",
                margin: "auto",
                marginTop: "30px",
              }}
            >
              <TextField
                sx={{ input: { color: '#f5f5f5' } }}
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
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PostCreate;
