import React, { useEffect, useState } from "react";
import "./Timeline.css";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function Timeline() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "posts"));
      // data.docs.map((doc) =>
      //   doc.data().postTags.map((tag) => console.log(tag.category))
      // );
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  return (
    <ImageList sx={{ width: 800, height: 1100 }} className="imageList">
      <ImageListItem key="Subheader" cols={2} className="imageListItem">
        <h2>Timeline</h2>
      </ImageListItem>
      {postList.map((post) => (
        <ImageListItem key={post.id}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/food-diary-e72b4.appspot.com/o/images%2F%E5%86%99%E7%9C%9F%202023-04-21%2018%2044%2054.jpg?alt=media&token=3693417f-5b05-481c-9c90-97cc2a8b2c62"
            srcSet="https://firebasestorage.googleapis.com/v0/b/food-diary-e72b4.appspot.com/o/images%2F%E5%86%99%E7%9C%9F%202023-04-21%2018%2044%2054.jpg?alt=media&token=3693417f-5b05-481c-9c90-97cc2a8b2c62&dpr=2 2x"
            alt={post.shopName}
            loading="lazy"
          />
          <ImageListItemBar
            title={post.shopName}
            subtitle={post.userName}
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
      ))}
    </ImageList>
  );
}
