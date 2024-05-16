import { Router } from "express";
import {
  createGoalCategory,
  deleteGoalCategory,
  getGoalCategories,
  getGoalCategory,
  updateGoalCategory,
} from "../controllers/goalCategory.controller.js";

const router = Router();

router.get("/goalCategories", getGoalCategories);

router.get("/goalCategories/:id", getGoalCategory);

router.post("/goalCategories", createGoalCategory);

router.patch("/goalCategories/:id", updateGoalCategory);

router.delete("/goalCategories/:id", deleteGoalCategory);

export default router;