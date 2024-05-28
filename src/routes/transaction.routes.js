import { Router } from "express";
import { createTransaction, deleteTransaction, getTransactions, getTransaction, updateTransaction, getTransactionsByUserId } from "../controllers/transaction.controller.js";

const router = Router();

router.get("/transactions", getTransactions);

router.get("/transactions/user/:userId", getTransactionsByUserId);

router.get("/transactions/:id", getTransaction);

router.post("/transactions", createTransaction);

router.patch("/transactions/:id", updateTransaction);

router.delete("/transactions/:id", deleteTransaction);

export default router;