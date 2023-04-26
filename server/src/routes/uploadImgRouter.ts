import { Router } from "express";

import {
  deleteImagesAvatar,
  deleteImagesMessages,
  deleteImagesPost,
  uploadImagesAvatar,
  uploadImagesMessages,
  uploadImagesPost,
} from "../controllers/uploadImgCtrl";
import { authMiddleware } from "../middleware/authMiddleWare";

import { imgResize, uploadPhoto } from "../middleware/uploadImage";
const router: Router = Router();

router.post(
  "/avatar",
  authMiddleware,
  uploadPhoto.array("images", 10),
  // imgResize,

  uploadImagesAvatar
);
router.post(
  "/post",
  authMiddleware,
  uploadPhoto.array("images", 10),
  // imgResize,

  uploadImagesPost
);
router.post(
  "/messages",
  authMiddleware,
  uploadPhoto.array("images", 10),
  // imgResize,

  uploadImagesMessages
);
router.delete("/delete-img/avatar/:id", authMiddleware, deleteImagesAvatar);
router.delete("/delete-img/post/:id", authMiddleware, deleteImagesPost);
router.delete("/delete-img/messages/:id", authMiddleware, deleteImagesMessages);

export default router;
