import React, { useContext, useEffect, useRef, useState } from "react";
import { LoginContext } from "../context/loginContext";
import { useNavigate } from "react-router-dom";
import "../css/style.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import { FaRegCommentDots } from "react-icons/fa6";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, IconButton, Popover } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InfiniteScroll from "react-infinite-scroll-component";

const CardSinglePost = ({ posts }) => {
  const { user, allPost, setAllPost } = useContext(LoginContext);
  const { decode: { id: loggedInUserId = "" } = {}, token = "" } = user || {};
  const {
    caption = "",
    comments: { count: commentsCount = 0, list: commentsList = [] } = {},
    post = "",
    likes: { count: likesCount = 0, list: likesList = [] } = {},
    userId: { name = "", _id: userId = "", profilePicture ="" } = {},
    timestamp = "",
    _id = "",
  } = posts || {};
  // console.log(userId);
  const firstLetter = name.charAt(0).toUpperCase();
  const nameCapital = name.charAt(0).toUpperCase() + name.slice(1);
  const date = new Date(timestamp);
  const day = date.toLocaleString("en-us", { weekday: "long" });
  const month = date.toLocaleString("en-us", { month: "long" });
  const year = date.getFullYear();
  const dayOfMonth = date.getDate();
  const alreadyComment = commentsList.map((comment) => {
    const {
      createdBy: { _id: commentedUserId = "", name: userName = "" } = {},
    } = comment || {};

    return commentedUserId;
  });
  const showComment = commentsList.map((comments) => {
    const {
      createdBy: { _id: commentedUserId = "", name: userName = "" } = {},
      comment = {},
    } = comments || {};

    const firstLetterComment = userName.charAt(0).toUpperCase();
    const nameCapitalComment =
      userName.charAt(0).toUpperCase() + userName.slice(1);
    return { commentedUserId, firstLetterComment, nameCapitalComment, comment };
  });

  const [commentModal, setCommentModal] = useState(false);
  const [comment, setComment] = useState("");

  const postLike = async (id) => {
    const updatedAllPosts = [...allPost];
    const { decode: { id: loggedInUserId = "" } = {} } = user || {};
    const clickedPostIndex = updatedAllPosts.findIndex(
      ({ _id: postId }) => id === postId
    );

    try {
      await fetch("http://localhost:5000/likePost", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          token: token,
        },
        body: JSON.stringify({ postId: id }),
      });
      const { likes: { list: likesList = [] } = {} } =
        updatedAllPosts[clickedPostIndex] || {};

      updatedAllPosts[clickedPostIndex].likes.list = [
        ...likesList,
        loggedInUserId,
      ];
      updatedAllPosts[clickedPostIndex].likes.count = likesList.length + 1 || 1;
      setAllPost(updatedAllPosts);
    } catch (err) {
      console.log(err);
    }
  };

  const postComment = async (id) => {
    const updatedAllPosts = [...allPost];
    const { decode: { id: loggedInUserId = "" } = {}, decode = {} } =
      user || {};
    const clickedPostIndex = updatedAllPosts.findIndex(
      ({ _id: postId }) => id === postId
    );
    const commentData = {
      postId: id,
      comment: comment,
    };

    try {
      await fetch("http://localhost:5000/commentPost", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          token: token,
        },
        body: JSON.stringify(commentData),
      });
      const { comments: { list: commentsList = [] } = {} } =
        updatedAllPosts[clickedPostIndex] || {};
      updatedAllPosts[clickedPostIndex].comments.list = [
        ...commentsList,
        { createdBy: { ...decode, _id: loggedInUserId }, comment },
      ];
      updatedAllPosts[clickedPostIndex].comments.count =
        commentsList.length + 1;
      setAllPost(updatedAllPosts);
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };

  const postDelete = async (id) => {
    const updatedAllPosts = [...allPost];
    const { decode: { id: loggedInUserId = "" } = {}, decode = {} } =
      user || {};
    const clickedPostIndex = updatedAllPosts.findIndex(
      ({ _id: postId }) => id === postId
    );

    try {
      const data = await fetch("http://localhost:5000/deletePost", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          token: token,
        },
        body: JSON.stringify({ postId: id }),
      });

      const newPost = updatedAllPosts.filter((posts) => posts._id !== id);
      setAllPost(newPost);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComment = async (id) => {
    const updatedAllPosts = [...allPost];
    const { decode: { id: loggedInUserId = "" } = {}, decode = {} } =
      user || {};
    const clickedPostIndex = updatedAllPosts.findIndex(
      ({ _id: postId }) => id === postId
    );

    try {
      const data = await fetch("http://localhost:5000/deleteComment", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          token: token,
        },
        body: JSON.stringify({ postId: id }),
      });
      const { comments: { list: commentsList = [] } = {} } =
        updatedAllPosts[clickedPostIndex] || {};

      const updatedCommentList = commentsList?.filter(
        (userId) => userId.createdBy._id !== loggedInUserId
      );
      updatedAllPosts[clickedPostIndex].comments.list = updatedCommentList;
      updatedAllPosts[clickedPostIndex].comments.count =
        updatedCommentList.length || 0;
      setAllPost(updatedAllPosts);
    } catch (err) {
      console.log(err);
    }
  };

  const postDislike = async (id) => {
    const updatedAllPosts = [...allPost];
    const { decode: { id: loggedInUserId = "" } = {} } = user || {};
    const clickedPostIndex = updatedAllPosts.findIndex(
      ({ _id: postId }) => id === postId
    );

    try {
      await fetch("http://localhost:5000/dislikePost", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          token: token,
        },
        body: JSON.stringify({ postId: id }),
      });
      const { likes: { list: likesList = [] } = {} } =
        updatedAllPosts[clickedPostIndex] || {};
      const updatedLikesList = likesList?.filter(
        (userId) => userId !== loggedInUserId
      );
      updatedAllPosts[clickedPostIndex].likes.list = updatedLikesList;
      updatedAllPosts[clickedPostIndex].likes.count =
        updatedLikesList.length || 0;

      setAllPost(updatedAllPosts);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div
        style={{
          border: "1px solid #CCD0D5",
          padding: "10px",
          borderRadius: "5px",
          cursor:"pointer"
        }}
      >
        <Modal
          sx={{
            top: 130,
            width: "400px",
            height: "400px",
            margin: "auto",
            bgcolor: "1px solid #262626",
          }}
          open={commentModal}
          onClose={() => {
            setCommentModal(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="createPostModal">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Comments
            </Typography>
            <Divider style={{ width: "100%", background: "#CCD0D5" }} />

            <Card
              sx={{
                maxWidth: "100%",
                bgcolor: "#262626",
                textAlign: "left",
                color: "#f5f5f5",
                boxShadow: "none",
              }}
            >
              {showComment ? (
                showComment.map((userComment) => {
                  return (
                    <div className="modalCommentFlexUserDelete">
                      <CardHeader
                        avatar={
                          <Avatar aria-label="recipe">
                            {userComment.firstLetterComment}
                          </Avatar>
                        }
                        title={
                          <Typography variant="h6">
                            {userComment.nameCapitalComment}
                          </Typography>
                        }
                        subheader={
                          <Typography>{userComment.comment}</Typography>
                        }
                      />
                      <DeleteOutlineIcon
                        onClick={() => {
                          setCommentModal(false);
                          deleteComment(_id);
                        }}
                        style={{ paddingTop: "25px" }}
                      />
                    </div>
                  );
                })
              ) : (
                <Typography variant="h6" sx={{ color: "#f5f5f5" }}>
                  No Comment
                </Typography>
              )}
            </Card>
          </Box>
        </Modal>

        
        <Card
          key={_id}
          sx={{
            width: "100%",
            bgcolor: "#121212",
            color: "#f5f5f5",
            boxShadow:
              "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
            paddingBottom: "25px",
          }}
        >
          <CardHeader
            avatar={<Avatar alt={firstLetter} src={profilePicture}   ></Avatar>}
            // action={
            //   <IconButton
            //     sx={{ color: "#f5f5f5" }}
            //     aria-label="settings"
            //     style={{ display: loggedInUserId == userId ? "block" : "none" }}
            //   >
            //     <DeleteOutlineIcon
            //       onClick={() => {
            //         postDelete(_id);
            //       }}
            //     />
            //   </IconButton>
            // }
            sx={{
              textAlign: "left",
              paddingLeft: "0px",
              fontSize: "20px",
            }}
            subheader={
              <Typography
                sx={{ color: "#f5f5f5", fontSize: "12px" }}
              >{`${dayOfMonth} ${month} ${year}`}</Typography>
            }
            title={
              <Typography sx={{ fontSize: "20px" }}>{nameCapital}</Typography>
            }
          />
          <div style={{ height: "400px", width: "100%" }}>
            <CardMedia
              component="img"
              sx={{ borderRadius: "10px" }}
              image={post}
              height="100%"
              width="100%"
              style={{ objectFit: "cover" }}
              alt="image"
            />
          </div>
          <div className="cardContent">
            <Typography
              variant="body2"
              color="#f5f5f5"
              sx={{ textAlign: "left" }}
            >
              {caption}
            </Typography>
          </div>
          <div className="cardIcon">
            <div style={{display:"flex", width:"60px", justifyContent:"space-between"}}>
            <div
              onClick={() => {
                if (likesList.includes(loggedInUserId)) {
                  postDislike(_id);
                } else {
                  postLike(_id);
                }
              }}
            >
              {likesList.includes(loggedInUserId) ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderSharpIcon sx={{ color: "#f5f5f5" }} />
              )}
            </div>
            <div>
              <FaRegCommentDots
                onClick={() => {
                  if (commentsCount == 0) {
                    setCommentModal(false);
                  } else {
                    setCommentModal(true);
                  }
                }}
              />
            </div>
            </div>
            <div   style={{ display: loggedInUserId == userId ? "block" : "none" }}>
            {/* <IconButton
                sx={{ color: "#f5f5f5" }}
                aria-label="settings"
              
              > */}
                <DeleteOutlineIcon
                  onClick={() => {
                    postDelete(_id);
                  }}
                />
              {/* </IconButton> */}
            </div>
          </div>
          <div className="likeCommentText">
            <div>{likesCount} Likes</div>
            <div>
              {" "}
              {commentsCount == 0 ? (
                <div onClick={() => setCommentModal(false)}>No Comments</div>
              ) : (
                <div
                  onClick={() => {
                    setCommentModal(true);
                  }}
                >
                  View {commentsCount} comments
                </div>
              )}
            </div>
          </div>
          {!alreadyComment.includes(loggedInUserId) ? (
            <div className="commentInput">
              <input
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                placeholder="Add a comment..."
              />
              {comment ? (
                <Button onClick={() => postComment(_id)}>Post</Button>
              ) : null}
            </div>
          ) : (
            ""
          )}
        </Card>
      </div>
    </div>
  );
};

export default CardSinglePost;
