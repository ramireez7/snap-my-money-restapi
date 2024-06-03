import { pool } from "../db.js";

export const getTargetCategories = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM target_category ORDER BY name ASC");
    if (result.length <= 0) {
      return res.status(401).json({
        message: "No target categories were found",
      });
    }
    res.json({ targetCategories: result });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong: " + error,
    });
  }
};

export const getTargetCategoriesByUserId = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM target_category where user_id = ? ORDER BY name ASC",
      req.params.userId
    );
    if (result.length <= 0) {
      return res.status(401).json({
        message: "No target categories were found",
      });
    }
    res.json({ targetCategories: result });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong: " + error,
    });
  }
};

export const getTargetCategory = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM target_category WHERE id = ?",
      req.params.id
    );
    if (result.length <= 0) {
      return res.status(404).json({
        message: "Target category not found",
      });
    }
    res.json({ targetCategory: result[0] });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong :(",
    });
  }
};

export const createTargetCategory = async (req, res) => {
  try {
    const { name, user_id } = req.body;
    const [result] = await pool.query(
      "INSERT INTO target_category (name, user_id) VALUES (?, ?)",
      [name, user_id]
    );
    res.send({
      id: result.insertId,
      name,
      user_id,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const updateTargetCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, user_id } = req.body;
    const [result] = await pool.query(
      "UPDATE target_category SET name = IFNULL(?, name), user_id = IFNULL(?, user_id) WHERE id = ?",
      [name, user_id, id]
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Target category not found",
      });
    }

    const [targetCategory] = await pool.query(
      "SELECT * FROM target_category WHERE id = ?",
      id
    );
    res.json({ targetCategory: targetCategory[0] });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteTargetCategory = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM target_category WHERE id = ?",
      req.params.id
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Target category not found",
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
