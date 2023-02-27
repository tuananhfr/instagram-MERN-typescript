import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleWare";
import {
  searchUser,
  getUser,
  followUser,
  unfollowUser,
  suggestionsUser,
  checkUser,
  checkEmail,
} from "../controllers/userCtrl";
const router: Router = Router();
router.get("/search", searchUser);
router.get("/:username", authMiddleware, getUser);
router.get("/check-user/:username", authMiddleware, checkUser);
router.get("/check-email/:email", authMiddleware, checkEmail);

router.put("/follow/:id", authMiddleware, followUser);
router.put("/unfollow/:id", authMiddleware, unfollowUser);
router.get("/suggestions-user", authMiddleware, suggestionsUser);

export default router;
