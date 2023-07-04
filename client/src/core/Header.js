import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { logout } from "../auth/api-auth";

const Header = ({ isLoggedin, setIsLoggedin, setLogoutMsg }) => {
  const handleLogout = () => {
    logout()
      .then((data) => {
        setLogoutMsg(data.message);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoggedin(false);
  };

  let sessionTimer;

  const startSessionTimer = () => {
    sessionTimer = setTimeout(handleLogout, 10 * 60 * 1000);
  };
  const resetSessionTimer = () => {
    clearTimeout(sessionTimer);
    startSessionTimer();
  };
  document.addEventListener("click", resetSessionTimer);
  document.addEventListener("keydown", resetSessionTimer);

  useEffect(() => {
    if (isLoggedin) {
      if (!sessionTimer) startSessionTimer();
      else resetSessionTimer();
    }
    // eslint-disable-next-line
  }, [isLoggedin]);

  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: "space-between" }}>
        <Typography variant="h6" color="inherit">
          Base Login/Auth System
        </Typography>
        {isLoggedin && (
          <span>
            <Button
              variant="outlined"
              style={{ color: "#ffff", borderColor: "#ffff" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
