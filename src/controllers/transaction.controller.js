import { pool } from "../db.js";

export const getTransactions = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM transaction ORDER BY created DESC"
    );
    if (result.length <= 0) {
      return res.status(401).json({
        message: "No transactions were found",
      });
    }
    res.json({ transactions: result });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong: " + error,
    });
  }
};

export const getTransactionsByUserId = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM transaction where user_id = ? ORDER BY created DESC",
      req.params.userId
    );
    if (result.length <= 0) {
      return res.status(401).json({
        message: "No transactions were found",
      });
    }
    res.json({ transactions: result });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong: " + error,
    });
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
    res.json({ transaction: result[0] });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong :(",
    });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const {
      name,
      user_id,
      amount,
      transaction_type_id,
      transaction_category_id,
    } = req.body;

    const [result] = await pool.query(
      "INSERT INTO transaction (name, user_id, amount, transaction_type_id, transaction_category_id) VALUES (?, ?, ?, ?, ?)",
      [name, user_id, amount, transaction_type_id, transaction_category_id]
    );

    let updateResult;
    if (transaction_type_id == 1) {
      [updateResult] = await pool.query(
        "UPDATE user SET balance = balance - ? WHERE id = ?",
        [amount, user_id]
      );
    } else {
      [updateResult] = await pool.query(
        "UPDATE user SET balance = balance + ? WHERE id = ?",
        [amount, user_id]
      );
    }

    if (updateResult.affectedRows === 0) {
      throw new Error(
        "La actualización no afectó ninguna fila. Verifica si el user_id es correcto."
      );
    }

    res.send({
      id: result.insertId,
      name,
      user_id,
      amount,
      transaction_type_id,
      transaction_category_id,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      user_id,
      amount,
      transaction_type_id,
      transaction_category_id,
    } = req.body;

    // Obtenemos la transacción original
    const [originalTransaction] = await pool.query(
      "SELECT * FROM transaction WHERE id = ?",
      [id]
    );

    if (originalTransaction.length === 0) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    const oldAmount = originalTransaction[0].amount;
    const oldTypeId = originalTransaction[0].transaction_type_id;

    const [result] = await pool.query(
      "UPDATE transaction SET name = IFNULL(?, name), user_id = IFNULL(?, user_id), amount = IFNULL(?, amount), transaction_type_id = IFNULL(?, transaction_type_id), transaction_category_id = ? WHERE id = ?",
      [name, user_id, amount, transaction_type_id, transaction_category_id, id]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    const [transaction] = await pool.query(
      "SELECT * FROM transaction WHERE id = ?",
      id
    );

    let userBalance = await pool.query(
      "SELECT balance FROM user WHERE id = ?",
      [user_id]
    );

    userBalance = userBalance[0][0].balance;
    if (userBalance == null) {
      userBalance = 0;
    }

    const parsedUserBalance = parseFloat(userBalance);
    const parsedOldAmount = parseFloat(oldAmount);
    const parsedAmount = parseFloat(amount);

    if (
      isNaN(parsedUserBalance) ||
      isNaN(parsedOldAmount) ||
      isNaN(parsedAmount)
    ) {
      throw new Error("Invalid input: All values must be numbers");
    }

    let newUserBalance;
    if (oldTypeId == 1 && transaction_type_id == 1) {
      newUserBalance = parsedUserBalance + parsedOldAmount - parsedAmount;
    } else if (oldTypeId == 1 && transaction_type_id == 2) {
      newUserBalance = parsedUserBalance + parsedOldAmount + parsedAmount;
    } else if (oldTypeId == 2 && transaction_type_id == 1) {
      newUserBalance = parsedUserBalance - parsedOldAmount - parsedAmount;
    } else if (oldTypeId == 2 && transaction_type_id == 2) {
      newUserBalance = parsedUserBalance - parsedOldAmount + parsedAmount;
    } else {
      newUserBalance = parsedUserBalance;
    }

    if (isNaN(newUserBalance)) {
      throw new Error("Calculated newUserBalance is NaN");
    }

    let updateResult = await pool.query(
      "UPDATE user SET balance = ? WHERE id = ?",
      [newUserBalance, transaction[0].user_id]
    );

    if (updateResult.affectedRows === 0) {
      throw new Error(
        "La actualización no afectó ninguna fila. Verifica si el user_id es correcto."
      );
    }

    res.json({ transaction: transaction[0] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    let [transaction] = await pool.query(
      "SELECT * FROM transaction WHERE id = ?",
      req.params.id
    );

    const [result] = await pool.query(
      "DELETE FROM transaction WHERE id = ?",
      req.params.id
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    let updateResult;
    if (transaction[0].transaction_type_id == 1) {
      [updateResult] = await pool.query(
        "UPDATE user SET balance = balance + ? WHERE id = ?",
        [transaction[0].amount, transaction[0].user_id]
      );
    } else {
      [updateResult] = await pool.query(
        "UPDATE user SET balance = balance - ? WHERE id = ?",
        [transaction[0].amount, transaction[0].user_id]
      );
    }

    if (updateResult.affectedRows === 0) {
      throw new Error(
        "La actualización no afectó ninguna fila."
      );
    }

    return res.status(200).json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong: " + error,
    });
  }
};
