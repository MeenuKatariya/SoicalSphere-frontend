import React, { useContext, useEffect, useRef, useState } from "react";
import { LoginContext } from "../context/loginContext";
import { useNavigate } from "react-router-dom";
import "../css/style.css";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import { FaRegCommentDots } from "react-icons/fa6";
import FavoriteIcon from "@mui/icons-material/Favorite";

const PostCard = () => {
  const { user } = useContext(LoginContext);
  const [allPost, setAllPost] = useState([]);
  const { token } = JSON.parse(localStorage.getItem("userInfo"));

  const getPost = async () => {
    try {
      const data = await fetch("http://localhost:5000/allPost");
      const res = await data.json();
      setAllPost(res);
    } catch (err) {
      console.log(err);
    }
  };

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

  useEffect(() => {
    getPost();
    getComment();
  }, []);

  return (
    <div>
      <div className="containerCardPost">
        <div className="cardPost">
          {allPost ? (
            allPost.map((posts = {}) => {
              const {
                caption = "",
                comments: {
                  count: commentsCount = 0,
                  list: commentsList = [],
                } = {},
                post = "",
                likes: { count: likesCount = 0, list: likesList = [] } = {},
                userId: { name = "" } = {},
                timestamp = "",
                _id = "",
              } = posts || {};

              const firstLetter = name.charAt(0).toUpperCase();
              const nameCapital = name.charAt(0).toUpperCase() + name.slice(1);
              const date = new Date(timestamp);
              const day = date.toLocaleString("en-us", { weekday: "long" });
              const month = date.toLocaleString("en-us", { month: "long" });
              const year = date.getFullYear();
              const dayOfMonth = date.getDate();
              const { decode: { id: loggedInUserId = "" } = {} } = user || {};
              return (
                <div
                  style={{
                    border: "1px solid #CCD0D5",
                    padding: "20px",
                    borderRadius: "5px",
                  }}
                >
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
                      avatar={
                        <Avatar aria-label="recipe">{firstLetter}</Avatar>
                      }
                      sx={{
                        textAlign: "left",
                        paddingLeft: "0px",
                        fontSize: "20px",
                      }}
                      subheader={
                        <Typography
                          sx={{ color: "#f5f5f5" }}
                        >{`${dayOfMonth} ${month} ${year}`}</Typography>
                      }
                      title={nameCapital}
                    />
                    <CardMedia
                      component="img"
                      sx={{ borderRadius: "10px" }}
                      image={post}
                      alt="image"
                    />
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
                        <FaRegCommentDots style={{ color: "#f5f5f5" }} />
                      </div>
                    </div>
                    <div className="likeCommentText">
                      <div>{likesCount} Likes</div>
                      <div
                     
                      >
                        {" "}
                        {commentsCount == 0 ? (
                          "No Comments"
                        ) : (
                          <div>View {commentsCount} comments</div>
                        )}
                      </div>
                    </div>
                    <div className="commentInput">
                      <input placeholder="Add a comment..." />
                    </div>
                  </Card>
                </div>
              );
            })
          ) : (
            <diV>No Post</diV>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
