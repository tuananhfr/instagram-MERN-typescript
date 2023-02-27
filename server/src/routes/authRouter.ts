import { Router } from "express";
import {
  handleRefreshToken,
  loginUser,
  logout,
  registerUser,
  updateUser,
} from "../controllers/authCtrl";
import { authMiddleware } from "../middleware/authMiddleWare";

const router: Router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", handleRefreshToken);
router.post("/logout", logout);
router.put("/", authMiddleware, updateUser);

export default router;
