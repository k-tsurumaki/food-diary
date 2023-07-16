import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./CreatePost.css";
import Tags from "../Tags/Tags";
import ImageUploader from "../ImageUploader/ImageUploader";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ isAuth }) => {
  const [shopName, setShopName] = useState("");
  const [postText, setPostText] = useState("");
  const [cost, setCost] = useState(1000);
  const [tasteValue, setTasteValue] = useState(3);
  const [moodValue, setMoodValue] = useState(3);
  const [overallValue, setOverall] = useState(3);
  const [postTags, setPostTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();


  const createPost = async () => {
    await addDoc(collection(db, "posts"), {
      shopName: shopName,
      image: imageUrl,
      postText: postText,
      cost: cost,
      taste: tasteValue,
      mood: moodValue,
      overall: overallValue,
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

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

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
        <ImageUploader
          loading={loading}
          setLoading={setLoading}
          isUploaded={isUploaded}
          setIsUploaded={setIsUploaded}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
        />
        <TextField
          className="postContent"
          id="outlined-multiline-static"
          label="Content"
          color="warning"
          multiline
          rows={4}
          onChange={(e) => setPostText(e.target.value)}
        />
        <FormControl
          className="postCost"
          variant="standard"
          sx={{ mt: 3, width: "10ch" }}
        >
          <Input
            id="standard-adornment-weight"
            endAdornment={<InputAdornment position="end">円</InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            color="warning"
            inputProps={{
              "aria-label": "weight",
            }}
            type="number"
            min="0"
            max="1000000"
            defaultValue="1000"
            onChange={(e) => setCost(e.target.value)}
          />
        </FormControl>
        <div className="postEvaluationContainer">
          <div className="postEvatuation">
            <Typography component="legend">Taste</Typography>
            <Rating
              name="simple-controlled"
              value={tasteValue}
              onChange={(event, newValue) => {
                setTasteValue(newValue);
              }}
            />
          </div>
          <div className="postEvatuation">
            <Typography component="legend">Mood</Typography>
            <Rating
              name="simple-controlled"
              value={moodValue}
              onChange={(event, newValue) => {
                setMoodValue(newValue);
              }}
            />
          </div>
          <div className="postEvatuation">
            <Typography component="legend">Overall</Typography>
            <Rating
              name="simple-controlled"
              value={overallValue}
              onChange={(event, newValue) => {
                setOverall(newValue);
              }}
            />
          </div>
        </div>
        <Tags className="postTags" color="warning" setPostTags={setPostTags} />
        <Button variant="contained" className="postButton" onClick={createPost}>
          Post
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
