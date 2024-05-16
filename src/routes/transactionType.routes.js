import { Router } from "express";
import {
  createTransactionType,
  deleteTransactionType,
  getTransactionTypes,
  getTransactionType,
  updateTransactionType,
} from "../controllers/transactionType.controller.js";

const router = Router();

router.get("/transactionTypes", getTransactionTypes);

router.get("/transactionTypes/:id", getTransactionType);

router.post("/transactionTypes", createTransactionType);

router.patch("/transactionTypes/:id", updateTransactionType);

router.delete("/transactionTypes/:id", deleteTransactionType);

export default router;