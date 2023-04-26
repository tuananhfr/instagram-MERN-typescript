import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleWare";
import {
  createNotify,
  deleteNotify,
  getNotify,
  isReadNotify,
} from "../controllers/notificationCtrl";
const router: Router = Router();
router.post("/", authMiddleware, createNotify);

router.get("/", authMiddleware, getNotify);
router.delete("/:id", authMiddleware, deleteNotify);
router.put("/:id", authMiddleware, isReadNotify);

export default router;
