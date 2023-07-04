import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./core/Header";
import Home from "./core/Home";
import Register from "./user/Register";
import Login from "./auth/Login";

const MainRouter = () => {
  const [isLoggedin, setIsLoggedin] = useState(() => {
    const storedIsLoggedin = sessionStorage.getItem("isLoggedIn");
    return storedIsLoggedin ? JSON.parse(storedIsLoggedin) : false;
  });

  const [logoutMsg, setLogoutMsg] = useState("");
  const [username, setUsername] = useState(() => {
    return sessionStorage.getItem("username") || "";
  });

  useEffect(() => {
    sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedin));
    sessionStorage.setItem("username", username);
  }, [isLoggedin, username]);

  return (
    <>
      <Header
        isLoggedin={isLoggedin}
        setIsLoggedin={setIsLoggedin}
        setLogoutMsg={setLogoutMsg}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              isLoggedin={isLoggedin}
              setIsLoggedin={setIsLoggedin}
              logoutMsg={logoutMsg}
              username={username}
            />
          }
        />
        <Route exact path="/register" element={<Register />} />
        <Route
          exact
          path="/login"
          element={
            <Login setIsLoggedin={setIsLoggedin} setUsername={setUsername} />
          }
        />
      </Routes>
    </>
  );
};

export default MainRouter;
