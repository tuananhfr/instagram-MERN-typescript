import { Router } from "express";

import { uploadImages } from "../controllers/uploadImg";
import { authMiddleware } from "../middleware/authMiddleWare";

import { imgResize, uploadPhoto } from "../middleware/uploadImage";
const router: Router = Router();

router.post(
  "/",
  authMiddleware,
  uploadPhoto.array("images", 10),
  imgResize,
  uploadImages
);
export default router;
