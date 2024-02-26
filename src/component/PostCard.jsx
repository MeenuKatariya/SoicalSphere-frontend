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
import InfiniteScroll from "react-infinite-scroll-component";
import { Circles } from "react-loader-spinner";

const PostCard = () => {
  const { allPost, getPost, hasMore } = useContext(LoginContext);
  return (
    <div  className="cardShow">
      <div id="scrollableDiv" className="containerCardPost">
        <div className="cardPost">
          {allPost.length ? (
            allPost.map((posts = {}, id = "") => {
              return <CardSinglePost posts={posts} key={posts.id} />;
            })
          ) : (
            <div
              style={{
                color: "#f5f5f5",
                border: "1px solid #262626",
                textAlign: "center",
                fontSize: "20px",
                padding: "10px",
              }}
            >
              Upload Post
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
