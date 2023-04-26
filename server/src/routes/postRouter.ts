import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleWare";
import {
  createPost,
  deletePost,
  getAPost,
  getExplorePosts,
  getPosts,
  getSavedPost,
  getUserPosts,
  likePost,
  unLikePost,
  updatePost,
} from "../controllers/postCtrl";
const router: Router = Router();
router.post("/", authMiddleware, createPost);
router.get("/", authMiddleware, getPosts);

router.get("/explore", authMiddleware, getExplorePosts);

router.get("/:id", authMiddleware, getAPost);

router.get("/user/:username", authMiddleware, getUserPosts);
router.put("/like/:id", authMiddleware, likePost);
router.put("/unlike/:id", authMiddleware, unLikePost);
router.put("/update", authMiddleware, updatePost);
router.delete("/delete/:id", authMiddleware, deletePost);
router.get("/save/:id", authMiddleware, getSavedPost);

export default router;
