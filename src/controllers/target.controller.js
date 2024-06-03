import { pool } from "../db.js";

export const getTargets = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM target ORDER BY created DESC");
    if (result.length <= 0) {
      return res.status(401).json({
        message: "No targets were found",
      });
    }
    res.json({ targets: result });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong: " + error,
    });
  }
};

export const getTargetsByUserId = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM target where user_id = ? ORDER BY created DESC",
      req.params.userId
    );
    if (result.length <= 0) {
      return res.status(401).json({
        message: "No targets were found",
      });
    }
    res.json({ targets: result });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong: " + error,
    });
  }
};

export const getTarget = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM target WHERE id = ?",
      req.params.id
    );
    if (result.length <= 0) {
      return res.status(404).json({
        message: "Target not found",
      });
    }
    res.json({ target: result[0] });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong :(",
    });
  }
};

export const createTarget = async (req, res) => {
  try {
    const { name, user_id, target_category_id, target_amount } = req.body;
    const [result] = await pool.query(
      "INSERT INTO target (name, user_id, target_category_id, target_amount) VALUES (?, ?, ?, ?)",
      [name, user_id, target_category_id, target_amount]
    );
    res.send({
      id: result.insertId,
      name,
      user_id,
      target_category_id,
      target_amount,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const updateTarget = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, user_id, target_category_id, target_amount } = req.body;
    const [result] = await pool.query(
      "UPDATE target SET name = IFNULL(?, name), user_id = IFNULL(?, user_id), target_category_id = IFNULL(?, target_category_id), target_amount = IFNULL(?, target_amount) WHERE id = ?",
      [name, user_id, target_category_id, target_amount, id]
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Target not found",
      });
    }

    const [target] = await pool.query("SELECT * FROM target WHERE id = ?", id);

    res.json({ taget: target[0] });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteTarget = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM target WHERE id = ?",
      req.params.id
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Target not found",
      });
    }
    return res.status(200).json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
