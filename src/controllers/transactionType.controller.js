import { pool } from "../db.js";

export const getTransactionTypes = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM transaction_type");
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

export const getTransactionType = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM transaction_type WHERE id = ?",
      req.params.id
    );
    if (result.length <= 0) {
      return res.status(404).json({
        message: "Transaction type not found",
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong :(",
    });
  }
};

export const createTransactionType = async (req, res) => {
  try {
    const { name } = req.body;
    const [result] = await pool.query(
      "INSERT INTO transaction_type (name) VALUES (?)",
      [name]
    );
    res.send({
      id: result.insertId,
      name,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const updateTransactionType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const [result] = await pool.query(
      "UPDATE transaction_type SET name = IFNULL(?, name) WHERE id = ?",
      [name, id]
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Transaction type not found",
      });
    }

    const [transactionType] = await pool.query(
      "SELECT * FROM transaction_type WHERE id = ?",
      id
    );
    res.json(transactionType[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteTransactionType = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM transaction_type WHERE id = ?",
      req.params.id
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Transaction type not found",
      });
    }
    res.status(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};