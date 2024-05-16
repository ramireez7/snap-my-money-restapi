import express from "express";
import indexRoutes from "./routes/index.routes.js";
import userRoutes from "./routes/user.routes.js";
import goalRoutes from "./routes/goal.routes.js";
import goalCategoryRoutes from "./routes/goalCategory.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";
import transactionCategoryRoutes from "./routes/transactionCategory.routes.js";
import transactionSubcategoryRoutes from "./routes/transactionSubcategory.routes.js";
import transactionTypeRoutes from "./routes/transactionType.routes.js";

const app = express();

app.use(express.json());

app.use(indexRoutes);
app.use("/api", userRoutes);
app.use("/api", goalRoutes);
app.use("/api", goalCategoryRoutes);
app.use("/api", transactionRoutes);
app.use("/api", transactionCategoryRoutes);
app.use("/api", transactionSubcategoryRoutes);
app.use("/api", transactionTypeRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

export default app;