import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleWare";
import {
  searchUser,
  getUser,
  followUser,
  unfollowUser,
  getSuggestionUser,
  savePost,
  unSavePost,
} from "../controllers/userCtrl";
const router: Router = Router();
router.get("/search", searchUser);

router.get("/suggestions", authMiddleware, getSuggestionUser);
router.get("/:username", authMiddleware, getUser);

router.put("/follow/:id", authMiddleware, followUser);
router.put("/unfollow/:id", authMiddleware, unfollowUser);
router.put("/save-post/:id", authMiddleware, savePost);
router.put("/unsave-post/:id", authMiddleware, unSavePost);

export default router;
