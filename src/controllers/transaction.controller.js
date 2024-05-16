import {pool} from "../db.js";

export const getTransactions = async (req, res) => {
  try{
    const [result] = await pool.query("SELECT * FROM transaction");
    if (result.length <= 0) {
      return res.status(401).json({
        message: "No transactions were found"
      });
    }
    res.json(result);
  }catch(error){
      return res.status(500).json({
        "message": "Something went wrong: " + error
      })
  }
};

export const getTransaction = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM transaction WHERE id = ?",
      req.params.id
    );
    if (result.length <= 0) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong :(",
    });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const { name, userId, amount, transactionTypeId, transactionCategoryId } = req.body;
    const [result] = await pool.query(
      "INSERT INTO transaction (name, user_id, amount, transaction_type_id, transaction_category_id) VALUES (?, ?, ?, ?, ?)",
      [name, userId, amount, transactionTypeId, transactionCategoryId]
    );
    res.send({
      id: result.insertId,
      name,
      userId,
      amount,
      transactionTypeId,
      transactionCategoryId
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, userId, amount, transactionTypeId, transactionCategoryId } = req.body;
    const [result] = await pool.query(
      "UPDATE transaction SET name = IFNULL(?, name), user_id = IFNULL(?, user_id), amount = IFNULL(?, amount), transaction_type_id = IFNULL(?, transaction_type_id), transaction_category_id = IFNULL(?, transaction_category_id) WHERE id = ?",
      [name, userId, amount, transactionTypeId, transactionCategoryId, id]
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    const [transaction] = await pool.query("SELECT * FROM transaction WHERE id = ?", id);
    res.json(transaction[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM transaction WHERE id = ?",
      req.params.id
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }
    res.status(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};