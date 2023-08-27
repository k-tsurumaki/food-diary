import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  LinearProgress,
  Menu,
  MenuItem,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Stack from "@mui/material/Stack";
import Tags from "../Tags/Tags";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import "./Post.css";
import { useParams } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import PostCard from "../PostCard/PostCard";
import { ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";


const Post = ({ isAuth }) => {
  const { postId } = useParams();
  const [selectedPost, setSelectedPost] = useState(null);
  const [isMyPost, setIsMyPost] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const getPost = async () => {
      // IDを指定してクリックされた投稿のデータを取得
      const post = await getDoc(doc(db, "posts", postId));
      setSelectedPost(post.data());

      // console.log(post.data().userId);
      // console.log(auth.currentUser.uid);

      // 投稿者と現在のユーザーを比較
      if (post.data().userId === auth.currentUser.uid) {
        setIsMyPost(true);
      }
    };
    getPost();
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDeletePost = async () => {
    // deletedFlagをtrueにして論理削除
    const docRef = doc(db, "posts", postId);
    await updateDoc(docRef, { deletedFlag: true });

    // timelineに遷移
    navigate("/");
  };

  const onEditPost = () => {};

  if (!selectedPost) {
    // 非同期処理が完了するまでローディングバーを表示
    return <LinearProgress color="warning" />;
  }

  return (
    <div className="selectedPostPage">
      <Card
        sx={{ minWidth: 500, maxWidth: 500 }}
        className="selectedPostContainer"
      >
        <CardHeader
          avatar={
            <Avatar src={selectedPost.userIcon} aria-label="recipe"></Avatar>
          }
          action={
            // 自分の投稿なら三点リーダーを表示
            isMyPost ? (
              <>
                <IconButton aria-label="settings">
                  <MoreVertIcon onClick={handleMenu} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Edit</MenuItem>
                  <MenuItem onClick={() => onDeletePost()}>Delete</MenuItem>
                </Menu>
              </>
            ) : null
          }
          title={selectedPost.userName}
          subheader={new Intl.DateTimeFormat("ja-JP", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }).format(selectedPost.timestamp.toDate())}
        />
        <CardMedia
          component="img"
          alt="food image"
          height="400"
          image={selectedPost.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {selectedPost.shopName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedPost.postText}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
};

export default Post;

// TODO:Tags.jsのcategoriesを参照するようにする
const categories = [
  { category: "肉料理" },
  { category: "海鮮料理" },
  { category: "寿司" },
  { category: "焼き鳥" },
  { category: "焼き肉" },
  { category: "丼" },
  { category: "うどん" },
  { category: "そば" },
  { category: "パスタ" },
  { category: "ピザ" },
  { category: "バーガー" },
  { category: "サンドイッチ" },
  { category: "パン" },
  { category: "ラーメン" },
  { category: "つけ麺" },
  { category: "まぜそば" },
  { category: "カレー" },
  { category: "和食" },
  { category: "フレンチ" },
  { category: "メキシカン料理" },
  { category: "中華料理" },
  { category: "インド料理" },
  { category: "韓国料理" },
  { category: "タイ料理" },
  { category: "ベトナム料理" },
  { category: "サラダ" },
  { category: "ステーキ" },
  { category: "シーフード" },
  { category: "ピリ辛料理" },
  { category: "ベジタリアン/ビーガン料理" },
  { category: "デザート" },
  { category: "アイスクリーム" },
  { category: "コーヒー/ティー" },
  { category: "ジュース/スムージー" },
  { category: "カフェ" },
  { category: "アルコール飲料" },
  { category: "ご当地グルメ" },
  { category: "居酒屋" },
  { category: "いろいろ" },
  { category: "自炊" },
  { category: "その他" },
];
