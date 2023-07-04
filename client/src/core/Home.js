import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActions, Icon, CardContent } from "@material-ui/core";
import Button from "@mui/material/Button";
import Typography from "@material-ui/core/Typography";
import { authenticate } from "../auth/api-auth";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
  },
  credit: {
    padding: 10,
    textAlign: "right",
    backgroundColor: "#ededed",
    borderBottom: "1px solid #d0d0d0",
    "& a": {
      color: "#3f4771",
    },
  },
  error: {
    verticalAlign: "middle",
    marginLeft: "1.5em",
  },
}));

let isInitial = true;

const Home = ({ isLoggedin, setIsLoggedin, logoutMsg }) => {
  const [username, setUsername] = useState("");
  const [showLogoutMsg, setShowLogoutMsg] = useState(false);

  const classes = useStyles();

  // useEffect(() => {
  //   authenticate()
  //     .then((data) => {
  //       if (data) {
  //         setUsername(data.user.name);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    authenticate()
      .then((data) => {
        if (data) {
          setUsername(data.user.name);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (logoutMsg) {
      setShowLogoutMsg(true);
      const timeout = setTimeout(() => {
        setShowLogoutMsg(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [logoutMsg]);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h4" className={classes.title}>
          Base Login/Auth System
        </Typography>
        {showLogoutMsg && !isLoggedin && (
          <Typography component="p" color="error">
            <Icon color="error" className={classes.error}>
              {logoutMsg}
            </Icon>
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {!isLoggedin ? (
          <>
            <Link to="/register">
              <Button variant="outlined">Register</Button>
            </Link>
            <Link to="/login">
              <Button variant="outlined">Login</Button>
            </Link>
          </>
        ) : (
          <Typography variant="h6">Welcome {username} </Typography>
        )}
      </CardActions>
    </Card>
  );
};

export default Home;
