import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Food Diary {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Login = ({ isAuth, setIsAuth, photoURL, setPhotoURL}) => {
  const navigate = useNavigate();
  const loginInWithGoogle = () => {
    // Googleでログイン
    signInWithPopup(auth, provider).then((results) => {
      // ローカルストレージに保存
      localStorage.setItem("isAuth", true);
      localStorage.setItem("photoURL", auth.currentUser.photoURL);

      setIsAuth(true);
      setPhotoURL(auth.currentUser.photoURL);

      // ログインするとHomeにリダイレクト
      navigate("/");
    });
  };
  const toHome = () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ height: "100vh" }}
        className="main"
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/UC0HZdUitWY)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "red" }}>
              <LockOutlinedIcon />
            </Avatar>
            {!isAuth ? (
              <>
                <Typography component="h1" variant="h5" className="loginText">
                  Let's login!
                </Typography>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="warning"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={loginInWithGoogle}
                >
                  Login
                </Button>
              </>
            ) : (
              <>
                <Typography component="h1" variant="h5" className="loginText">
                  Already logined!
                </Typography>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="warning"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={toHome}
                >
                  Home
                </Button>
              </>
            )}
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
