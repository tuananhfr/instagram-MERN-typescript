import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleWare";
import {
  createMessages,
  deleteMessages,
  getMessages,
} from "../controllers/messagesCtrl";
const router: Router = Router();
router.post("/", authMiddleware, createMessages);
router.get("/:id", authMiddleware, getMessages);
router.delete("/delete/:id", authMiddleware, deleteMessages);

export default router;
