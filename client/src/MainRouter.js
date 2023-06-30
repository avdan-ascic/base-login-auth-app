import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./core/Header";
import Home from "./core/Home";
import Register from "./user/Register";
import Login from "./auth/Login";
import { authenticate } from "./auth/api-auth";

const MainRouter = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [logoutMsg, setLogoutMsg] = useState("");

  useEffect(() => {
    authenticate()
      .then((data) => {
        if (data.user) {
          setIsLoggedin(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

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
            />
          }
        />
        <Route exact path="/register" element={<Register />} />
        <Route
          exact
          path="/login"
          element={<Login setIsLoggedin={setIsLoggedin} />}
        />
      </Routes>
    </>
  );
};

export default MainRouter;
