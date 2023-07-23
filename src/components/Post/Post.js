import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  LinearProgress,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import Tags from "../Tags/Tags";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import "./Post.css";
import { useParams } from "react-router-dom";

const Post = ({ isAuth }) => {
  const { postId } = useParams();
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      // IDを指定してクリックされた投稿のデータを取得
      const post = await getDoc(doc(db, "posts", postId));
      setSelectedPost(post.data());
    };
    getPost();
  }, []);

  if (!selectedPost) {
    return <LinearProgress color="warning"/>; // 非同期処理が完了するまでローディングメッセージを表示
  }

  return (
    <div className="postPage">
      <div className="postContainer">
        <h1>New Post</h1>
        <TextField
          className="postShopName"
          id="standard-required"
          label="Shop Name"
          variant="standard"
          color="warning"
        />
        <TextField
          className="postContent"
          id="outlined-multiline-static"
          label="Content"
          color="warning"
          multiline
          rows={4}
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
            defaultValue={selectedPost.cost}
          />
        </FormControl>
        <div className="postEvaluationContainer">
          <div className="postEvatuation">
            <Typography component="legend">Taste</Typography>
            <Rating name="read-only" value={selectedPost.taste} readOnly />
          </div>
          <div className="postEvatuation">
            <Typography component="legend">Mood</Typography>
            <Rating name="read-only" value={selectedPost.mood} readOnly />
          </div>
          <div className="postEvatuation">
            <Typography component="legend">Overall</Typography>
            <Rating name="read-only" value={selectedPost.overall} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
