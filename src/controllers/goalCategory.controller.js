import {pool} from "../db.js";

export const getGoalCategories = async (req, res) => {
  try{
    const [result] = await pool.query("SELECT * FROM goal_category");
    if (result.length <= 0) {
      return res.status(401).json({
        message: "No goal categories were found"
      });
    }
    res.json(result);
  }catch(error){
      return res.status(500).json({
        message: "Something went wrong: " + error
      })
  }
};

export const getGoalCategory = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM goal_category WHERE id = ?",
      req.params.id
    );
    if (result.length <= 0) {
      return res.status(404).json({
        message: "Goal category not found",
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong :(",
    });
  }
};

export const createGoalCategory = async (req, res) => {
  try {
    const { name, userId } = req.body;
    const [result] = await pool.query(
      "INSERT INTO goal_category (name, user_id) VALUES (?, ?)",
      [name, userId]
    );
    res.send({
      id: result.insertId,
      name,
      userId
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

export const updateGoalCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, userId } = req.body;
    const [result] = await pool.query(
      "UPDATE goal_category SET name = IFNULL(?, name), user_id = IFNULL(?, user_id) WHERE id = ?",
      [name, userId, id]
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Goal category not found",
      });
    }

    const [goalCategory] = await pool.query("SELECT * FROM goal_category WHERE id = ?", id);
    res.json(goalCategory[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteGoalCategory = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM goal_category WHERE id = ?",
      req.params.id
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Goal category not found",
      });
    }
    res.status(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};