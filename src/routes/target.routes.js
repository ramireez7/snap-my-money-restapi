import { Router } from "express";
import { createTarget, deleteTarget, getTargets, getTarget, updateTarget } from "../controllers/target.controller.js";

const router = Router();

router.get("/targets", getTargets);

router.get("/targets/:id", getTarget);

router.post("/targets", createTarget);

router.patch("/targets/:id", updateTarget);

router.delete("/targets/:id", deleteTarget);

export default router;