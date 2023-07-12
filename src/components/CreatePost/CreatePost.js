import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import "./CreatePost.css";
import Tags from "../Tags/Tags";
import ImageUploader from "../ImageUploader/ImageUploader";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [shopName, setShopName] = useState("");
  const [postText, setPostText] = useState("");
  const [postTags, setPostTags] = useState([]);

  const navigate = useNavigate();

  const createPost = async () => {
    // console.log(shopName);
    // console.log(postText);
    // console.log(postTags);

    await addDoc(collection(db, "posts"), {
      shopName: shopName,
      postText: postText,
      postTags: postTags,
      // auther: {
      //   username: auth.currentUser.displayName,
      //   id: auth.currentUser.uid,
      //   icon: auth.currentUser.photoURL,
      // },
      userName: auth.currentUser.displayName,
      userId: auth.currentUser.uid,
      userIcon: auth.currentUser.photoURL,
      timestamp: serverTimestamp(),
    });
    navigate("/");
  };

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
          onChange={(e) => setShopName(e.target.value)}
        />
        <ImageUploader />
        <TextField
          className="postContent"
          id="outlined-multiline-static"
          label="Content"
          color="warning"
          multiline
          rows={4}
          onChange={(e) => setPostText(e.target.value)}
        />
        <FormControl variant="standard" sx={{ mt: 3, width: "10ch" }}>
          <Input
            id="standard-adornment-weight"
            endAdornment={<InputAdornment position="end">円</InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            color="warning"
            inputProps={{
              "aria-label": "weight",
            }}
          />
        </FormControl>
        <Tags className="postTags" color="warning" setPostTags={setPostTags} />
        <Button variant="contained" className="postButton" onClick={createPost}>
          Post
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
