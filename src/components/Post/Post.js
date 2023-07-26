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
    // 非同期処理が完了するまでローディングバーを表示
    return <LinearProgress color="warning" />;
  }

  return (
    <div className="postPage">
      <div className="postContainer">
        <div className="imageContainer">
          <img
            className="image"
            src={selectedPost.image}
            srcSet={selectedPost.image + "&dpr=2 2x"}
            alt={selectedPost.shopName}
            loading="lazy"
          />
          <h2 className="text-over-image">{selectedPost.shopName}</h2>
        </div>
        <TextField
          className="postContent"
          id="outlined-multiline-static"
          label="Content"
          color="warning"
          variant="filled" // 追加
          multiline
          rows={4}
          defaultValue={selectedPost.postText}
          disabled
          InputProps={{
            // 追加
            readOnly: true,
          }}
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
