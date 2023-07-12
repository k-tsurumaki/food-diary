import { Button, TextField } from "@mui/material";
import React from "react";
import "./CreatePost.css";
import Tags from "../Tags/Tags";
import ImageUploader from "../ImageUploader/ImageUploader";
// import GoogleMaps from "../GoogleMaps/GoogleMaps";

const CreatePost = () => {
  return (
    <div className="createPostPage">
      <div className="postContainer">
        <h1>New Post</h1>
        <TextField
          className="postShopName"
          id="standard-required"
          label="Shop Name"
          variant="standard"
          color="warning"
        />
        <ImageUploader />
        <TextField
          className="postContent"
          id="outlined-multiline-static"
          label="Content"
          color="warning"
          multiline
          rows={4}
        />
        <Tags className="postTags" />
        <Button variant="contained" className="postButton">
          Post
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
