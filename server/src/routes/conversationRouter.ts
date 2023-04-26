import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleWare";
import {
  createConversation,
  deleteConversation,
  getAConversation,
  getConversation,
  isReadConversation,
} from "../controllers/conversationCtrl";
const router: Router = Router();
router.post("/:id", authMiddleware, createConversation);
router.get("/", authMiddleware, getConversation);
router.get("/:id", authMiddleware, getAConversation);

router.delete("/delete/:id", authMiddleware, deleteConversation);
router.put("/:id", authMiddleware, isReadConversation);

export default router;
