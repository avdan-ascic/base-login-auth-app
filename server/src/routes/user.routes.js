import express from "express";

import userCtrl from "../controllers/user.controller";
import { registerValidator } from "../user.validation";
import checkValidationResult from "../user.validation";
import passport from "passport";

const router = express.Router();

router
  .route("/api/users/register")
  .post(registerValidator, checkValidationResult, userCtrl.create);
router.route("/api/users/login").post(userCtrl.login);
router.route("/api/users/logout").get(userCtrl.logout);
router
  .route("/api/users/authenticate")
  .get(
    passport.authenticate("jwt", { session: false }),
    userCtrl.isAuthenticated
  );

export default router;
