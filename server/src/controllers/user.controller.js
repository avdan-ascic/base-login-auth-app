import jwt from "jsonwebtoken";
import User from "../model/user.model";

import config from "../config/config";

const create = (req, res, next) => {
  const user = new User(req.body);
  user
    .save()
    .then(() =>
      res.status(200).json({ message: "Successfully created a new user." })
    )
    .catch((err) => res.status(400).json({ error: err.message }));
};

const login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: err.message });
      }
      if (!user.authenticate(req.body.password)) {
        return res
          .status(400)
          .json({ error: "Email and password do not match!!" });
      }
      const token = jwt.sign({ _id: user._id }, config.secret, {
        expiresIn: "20m",
      });
      res.cookie("jwt", token, {
        domain: "localhost",
        httpOnly: true,
      });
      res.status(200).json({
        // token,
        user: { _id: user._id, name: user.name, email: user.email },
      });
    })
    .catch((err) => {
      res.status(401).json({ error: "User not found" });
    });
};

const logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "User signed out successfully." });
};

const isAuthenticated = (req, res, next) => {
  res.status(200).json({
    user: { isAuthenticated: true, id: req.user._id, name: req.user.name },
  });
};

export default { create, login, logout, isAuthenticated };
