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
    origin: "*", // Permitir todas las solicitudes de origen
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
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
app.use("/auth", authRoutes);
app.use(userRoutes);
app.use(verifyTokenMiddleware, targetRoutes);
app.use(verifyTokenMiddleware, targetCategoryRoutes);
app.use(verifyTokenMiddleware, transactionRoutes);
app.use(verifyTokenMiddleware, transactionCategoryRoutes);
app.use(verifyTokenMiddleware, transactionTypeRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

export default app;
