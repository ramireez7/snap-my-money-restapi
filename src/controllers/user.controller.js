import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM user");
    if (result.length <= 0) {
      return res.status(401).json({
        message: "No users were found",
      });
    }
    res.json({ users: result });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong: " + error,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM user WHERE id = ?", [
      req.params.id,
    ]);
    if (result.length <= 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json({ user: result[0] });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong :(",
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const [result] = await pool.query("SELECT * FROM user WHERE id = ?", [
      userId,
    ]);
    if (result.length <= 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json({ user: result[0] });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong: " + error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, balance } = req.body;
    const [result] = await pool.query(
      "UPDATE user SET name = IFNULL(?, name), email = IFNULL(?, email), password = IFNULL(?, password), balance = IFNULL(?, balance) WHERE id = ?",
      [name, email, password, balance, id]
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const [user] = await pool.query("SELECT * FROM user WHERE id = ?", [id]);
    res.json({ user: user[0] });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM user WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
