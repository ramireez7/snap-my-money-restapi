import {pool} from "../db.js";

export const getUsers = async (req, res) => {
  try{
    const [result] = await pool.query("SELECT * FROM user");
    if (result.length <= 0) {
      return res.status(401).json({
        message: "No users were found"
      });
    }
    res.json(result);
  }catch(error){
      return res.status(500).json({
        "message": "Something went wrong :("
      })
  }
};

export const getUser = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM user WHERE id = ?",
      req.params.id
    );
    if (result.length <= 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong :(",
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, balance } = req.body;
    const [result] = await pool.query(
      "INSERT INTO user (name, balance) VALUES (?, ?)",
      [name, balance]
    );
    res.send({
      id: result.insertId,
      name,
      balance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong :(",
    });
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, balance } = req.body;
    const [result] = await pool.query(
      "UPDATE user SET name = IFNULL(?, name), balance = IFNULL(?, balance) WHERE id = ?",
      [name, balance, id]
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const [user] = await pool.query("SELECT * FROM user WHERE id = ?", id);
    res.json(user[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong :(",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM user WHERE id = ?",
      req.params.id
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong :(",
    });
  }
};