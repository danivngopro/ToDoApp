import "./SignUp.css";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/base";
import CustomLink from "../components/CustomLink";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

function SignUp() {
  const router = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);

  const checkAllFields = (username, password) => {
    if (username.length === 0) {
      setErrorMessage("Please enter username");
      return false;
    } else if (username.length < 5) {
      setErrorMessage("username too short, must be at least 6 characters");
      return false;
    } else if (password.length === 0) {
      setErrorMessage("Please enter password");
      return false;
    } else setErrorMessage(null);
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (checkAllFields(data.get("username"), data.get("password"))) {
      createUserWithEmailAndPassword(
        auth,
        data.get("email"),
        data.get("password")
      )
        .then((res) => {
          updateProfile(auth.currentUser, {
            displayName: data.get("username"),
          });
          sendEmailVerification(auth.currentUser);
          router("/");
        })
        .catch((res) => {
          const error = JSON.stringify(res).split(",")[0].split('"')[3];
          switch (error) {
            case "auth/email-already-in-use":
              setErrorMessage(
                "Email already in use. please enter a different email."
              );
              break;
            case "auth/missing-email":
              setErrorMessage("Please enter email address");
              break;
            case "auth/weak-password":
              setErrorMessage("Password too weak");
              break;
            case "auth/invalid-email":
              setErrorMessage("Please enter valid email address.");
              break;
            default:
              break;
          }
        });
    }
  };

  const theme = createTheme();

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const authentication = onAuthStateChanged(auth, (user) => {
      if (user) setIsConnected(true);
      else setIsConnected(false);
    });

    return authentication;
  });

  return (
    <>
      {!isConnected ? (
        <ThemeProvider theme={theme}>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: "url(https://source.unsplash.com/random)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign Up
                </Typography>
                <Typography className="errorMessage">{errorMessage}</Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container>
                    <Grid item>
                      <ul>
                        <CustomLink to="/login" className="backToSignup">
                          have an account? Sign In
                        </CustomLink>
                      </ul>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      ) : (
        <h1>You're already connected. please sign out first.</h1>
      )}
    </>
  );
}

export default SignUp;
