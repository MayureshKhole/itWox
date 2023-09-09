import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { StoreData } from "./store/model";

export default function Navbar() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: StoreData) => state.auth.isAuthenticated);

  const signOutHandler = () => {
    localStorage.removeItem("formData");
    dispatch(authActions.logout);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {isAuth && (
            <a
              style={{
                textDecoration: "none",
                color: "inherit",
                marginRight: "20px",
              }}
              href="/dashboard"
            >
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Dashboard
              </Typography>
            </a>
          )}
          {!isAuth && (
            <a style={{ textDecoration: "none", color: "inherit" }} href="/">
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Home
              </Typography>
            </a>
          )}
          <div style={{ flexGrow: 1 }}></div>
          {!isAuth && (
            <Button href="/sign-in" color="inherit">
              Sign In
            </Button>
          )}
          {isAuth && (
            <Button onClick={signOutHandler} href="/" color="inherit">
              Sign Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
