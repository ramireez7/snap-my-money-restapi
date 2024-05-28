import express from "express";
import cors from "cors";
import indexRoutes from "./routes/index.routes.js";
import userRoutes from "./routes/user.routes.js";
import targetRoutes from "./routes/target.routes.js";
import targetCategoryRoutes from "./routes/targetCategory.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import transactionCategoryRoutes from "./routes/transactionCategory.routes.js";
import transactionTypeRoutes from "./routes/transactionType.routes.js";
import authRoutes from "./routes/auth.routes.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:8100",
  })
);

app.use(express.json());

// Middleware para verificar el token
const verifyTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const secretKey = process.env.SECRET_KEY;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null || token === "undefined") return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.use(indexRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", verifyTokenMiddleware, targetRoutes);
app.use("/api", verifyTokenMiddleware, targetCategoryRoutes);
app.use("/api", verifyTokenMiddleware, transactionRoutes);
app.use("/api", verifyTokenMiddleware, transactionCategoryRoutes);
app.use("/api", verifyTokenMiddleware, transactionTypeRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

export default app;
