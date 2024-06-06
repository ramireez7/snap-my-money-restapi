import { Router } from "express";
import { createTarget, deleteTarget, getTargets, getTarget, updateTarget, getTargetsByUserId, updateTargetAmount } from "../controllers/target.controller.js";

const router = Router();

router.get("/targets", getTargets);

router.get("/targets/user/:userId", getTargetsByUserId);

router.get("/targets/:id", getTarget);

router.post("/targets", createTarget);

router.patch("/targets/:id", updateTarget);

router.put("/targets/:id", updateTargetAmount);

router.delete("/targets/:id", deleteTarget);

export default router;