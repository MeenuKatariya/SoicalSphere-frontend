import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../context/loginContext";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteBorderSharpIcon from "@mui/icons-material/FavoriteBorderSharp";
import { FaRegCommentDots } from "react-icons/fa6";

import MoreVertIcon from "@mui/icons-material/MoreVert";

const PostCard = () => {
  const { user } = useContext(LoginContext);
  const [allPost, setAllPost] = useState([]);
  const [allComment, setAllComment] = useState({});
  const [allCommentShow, setAllCommentShow] = useState(false);
  const navigate = useNavigate();

  const getPost = async () => {
    try {
      const data = await fetch("http://localhost:5000/allPost");
      const res = await data.json();
      setAllPost(res);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getComment = async () => {
    try {
      const data = await fetch("http://localhost:5000/allComment");
      const res = await data.json();
      setAllComment(res);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPost();
    getComment();
  }, []);

  return (
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
              userId: { name = "", _id = "" } = {},
              timestamp = "",
            } = posts || {};
            const firstLetter = name.charAt(0).toUpperCase();
            const nameCapital = name.charAt(0).toUpperCase() + name.slice(1);
            const date = new Date(timestamp);
            const day = date.toLocaleString("en-us", { weekday: "long" });
            const month = date.toLocaleString("en-us", { month: "long" });
            const year = date.getFullYear();
            const dayOfMonth = date.getDate();

            return (
              <Card
                key={_id}
                sx={{ width: "100%", bgcolor: "#121212", color: "#f5f5f5" }}
              >
                <CardHeader
                  avatar={<Avatar aria-label="recipe">{firstLetter}</Avatar>}
                  sx={{ textAlign: "left" }}
                  title={nameCapital}
                  subheader={
                    <Typography
                      sx={{ color: "#f5f5f5" }}
                    >{`${dayOfMonth} ${month} ${year}`}</Typography>
                  }
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
                  <div>
                    <FavoriteBorderSharpIcon sx={{ color: "#f5f5f5" }} />
                  </div>
                  <div>
                    <FaRegCommentDots style={{ color: "#f5f5f5" }} />
                  </div>
                </div>
                <div className="likeCommentText">
                  <div>{likesCount} Likes</div>
                  <div onClick={() => setAllComment(true)}>
                    {" "}
                    View all {commentsCount} comments
                  </div>
                </div>

              </Card>
            );
          })
        ) : (
          <diV>No Post</diV>
        )}
      </div>
     <div className="commentShowWrapper">
     {
        allCommentShow ? <div> 
          <div>
            Comments
          </div>
          <div>
            <div> 
                 
            </div>
          </div>
        </div> : ""
      }
     </div>
    </div>
  );
};

export default PostCard;
