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
      {/* <ImageListItem key="Subheader" cols={2} className="imageListItem">
        <h2>Timeline</h2>
      </ImageListItem> */}
      {postList.map((post) => (
        <Link to={`/post/${post.id}`} key={post.id}>
          <ImageListItem >
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
        </Link>
      ))}
    </ImageList>
  );
}
