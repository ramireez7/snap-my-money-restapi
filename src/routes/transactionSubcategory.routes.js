import { Router } from "express";
import {
  createTransactionSubcategory,
  deleteTransactionSubcategory,
  getTransactionSubcategories,
  getTransactionSubcategory,
  updateTransactionSubcategory,
} from "../controllers/transactionSubcategory.controller.js";

const router = Router();

router.get("/transactionSubcategories", getTransactionSubcategories);

router.get("/transactionSubcategories/:id", getTransactionSubcategory);

router.post("/transactionSubcategories", createTransactionSubcategory);

router.patch("/transactionSubcategories/:id", updateTransactionSubcategory);

router.delete("/transactionSubcategories/:id", deleteTransactionSubcategory);

export default router;