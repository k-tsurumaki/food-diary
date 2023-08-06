import React, { useEffect, useState } from "react";
import "./Timeline.css";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { Box, Rating, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  1: "Bad",
  2: "Poor",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

export default function Timeline() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
      // const data = await getDocs(collection(db, "posts"));
      // data.docs.map((doc) =>
      //   doc.data().postTags.map((tag) => console.log(tag.category))
      // );
      const data = await getDocs(q);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  return (
    <ImageList sx={{ width: 800, height: 1100 }} className="imageList">
      {postList.map((post) => (
        <Link className="postLink" to={`/post/${post.id}`} key={post.id}>
          <ImageListItem>
            <div className="imageContainer">
              <img
                className="image"
                src={post.image}
                srcSet={post.image + "&dpr=2 2x"}
                alt={post.shopName}
                loading="lazy"
              />
            </div>
            <ImageListItemBar
              title={post.shopName}
              subtitle={
                "@" +
                post.userName +
                " " +
                new Intl.DateTimeFormat("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(post.timestamp.toDate())
              }
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${post.shopName}`}
                >
                  <ArrowCircleRightIcon />
                </IconButton>
              }
            />
          </ImageListItem>
          <Box
            sx={{
              width: 200,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              name="read-only"
              value={post.overall}
              readOnly
              precision={0.5}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            <Typography sx={{ ml: 2 }} >{labels[post.overall]}</Typography>
          </Box>
        </Link>
      ))}
    </ImageList>
  );
}
