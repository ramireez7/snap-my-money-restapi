import { Router } from "express";
import { createGoal, deleteGoal, getGoals, getGoal, updateGoal } from "../controllers/goal.controller.js";

const router = Router();

router.get("/goals", getGoals);

router.get("/goals/:id", getGoal);

router.post("/goals", createGoal);

router.patch("/goals/:id", updateGoal);

router.delete("/goals/:id", deleteGoal);

export default router;