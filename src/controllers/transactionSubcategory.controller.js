import { pool } from "../db.js";

export const getTransactionSubcategories = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM transaction_subcategory");
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

export const getTransactionSubcategory = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM transaction_subcategory WHERE id = ?",
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

export const createTransactionSubcategory = async (req, res) => {
  try {
    const { name, userId, transactionCategoryId } = req.body;
    const [result] = await pool.query(
      "INSERT INTO transaction_subcategory (name, user_id, transaction_category_id) VALUES (?, ?, ?)",
      [name, userId, transactionCategoryId]
    );
    res.send({
      id: result.insertId,
      name,
      userId,
      transactionCategoryId
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const updateTransactionSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, userId, transactionCategoryId } = req.body;
    const [result] = await pool.query(
      "UPDATE transaction_subcategory SET name = IFNULL(?, name), user_id = IFNULL(?, user_id), transaction_category_id = IFNULL(?, transaction_category_id) WHERE id = ?",
      [name, userId, transactionCategoryId, id]
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Transaction category not found",
      });
    }

    const [transactionSubcategory] = await pool.query(
      "SELECT * FROM transaction_subcategory WHERE id = ?",
      id
    );
    res.json(transactionSubcategory[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteTransactionSubcategory = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM transaction_subcategory WHERE id = ?",
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