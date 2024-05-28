import { Router } from "express";
import {
  createTargetCategory,
  deleteTargetCategory,
  getTargetCategories,
  getTargetCategoriesByUserId,
  getTargetCategory,
  updateTargetCategory,
} from "../controllers/targetCategory.controller.js";

const router = Router();

router.get("/targetCategories", getTargetCategories);

router.get("/targetCategories/user/:userId", getTargetCategoriesByUserId);

router.get("/targetCategories/:id", getTargetCategory);

router.post("/targetCategories", createTargetCategory);

router.patch("/targetCategories/:id", updateTargetCategory);

router.delete("/targetCategories/:id", deleteTargetCategory);

export default router;