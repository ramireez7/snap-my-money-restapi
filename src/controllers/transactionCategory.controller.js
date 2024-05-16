import { pool } from "../db.js";

export const getTransactionCategories = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM transaction_category");
    if (result.length <= 0) {
      return res.status(401).json({
        message: "No transaction categories were found",
      });
    }
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong: " + error,
    });
  }
};

export const getTransactionCategory = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM transaction_category WHERE id = ?",
      req.params.id
    );
    if (result.length <= 0) {
      return res.status(404).json({
        message: "Transaction category not found",
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong :(",
    });
  }
};

export const createTransactionCategory = async (req, res) => {
  try {
    const { name, userId } = req.body;
    const [result] = await pool.query(
      "INSERT INTO transaction_category (name, user_id) VALUES (?, ?)",
      [name, userId]
    );
    res.send({
      id: result.insertId,
      name,
      userId,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const updateTransactionCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, userId } = req.body;
    const [result] = await pool.query(
      "UPDATE transaction_category SET name = IFNULL(?, name), user_id = IFNULL(?, user_id) WHERE id = ?",
      [name, userId, id]
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Transaction category not found",
      });
    }

    const [transactionCategory] = await pool.query(
      "SELECT * FROM transaction_category WHERE id = ?",
      id
    );
    res.json(transactionCategory[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteTransactionCategory = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM transaction_category WHERE id = ?",
      req.params.id
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Transaction category not found",
      });
    }
    res.status(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};