import { Router } from "express";
import {
  createTransactionCategory,
  deleteTransactionCategory,
  getTransactionCategories,
  getTransactionCategoriesByUserId,
  getTransactionCategory,
  updateTransactionCategory,
} from "../controllers/transactionCategory.controller.js";

const router = Router();

router.get("/transactionCategories", getTransactionCategories);

router.get("/transactionCategories/user/:userId", getTransactionCategoriesByUserId);

router.get("/transactionCategories/:id", getTransactionCategory);

router.post("/transactionCategories", createTransactionCategory);

router.patch("/transactionCategories/:id", updateTransactionCategory);

router.delete("/transactionCategories/:id", deleteTransactionCategory);

export default router;