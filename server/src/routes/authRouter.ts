import { Router } from "express";
import {
  handleRefreshToken,
  loginUser,
  logout,
  registerUser,
  updateUser,
  loginFacebookUser,
  getCurrentUser,
  forgotPasswordToken,
  resetPassword,
} from "../controllers/authCtrl";
import { authMiddleware } from "../middleware/authMiddleWare";

const router: Router = Router();
router.post("/refresh", handleRefreshToken);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/login-facebook", loginFacebookUser);

router.post("/logout", logout);
router.put("/", authMiddleware, updateUser);
router.get("/", authMiddleware, getCurrentUser);
router.post("/forgot-password", forgotPasswordToken);
router.post("/reset-password", resetPassword);

export default router;
