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
import CardSinglePost from "./CardSinglePost";

const PostCard = () => {
  const { user } = useContext(LoginContext);
  const [allPost, setAllPost] = useState([]);
  const [comment, setComment] = useState("");
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

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      <div className="containerCardPost">
        <div className="cardPost">
          {allPost ? (
            allPost.map((posts = {}) => {
              return <CardSinglePost
                allPost={allPost}
                setAllPost={setAllPost}
                posts={posts}
              />;
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
