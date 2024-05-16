import {pool} from "../db.js";

export const getGoals = async (req, res) => {
  try{
    const [result] = await pool.query("SELECT * FROM goal");
    if (result.length <= 0) {
      return res.status(401).json({
        message: "No goals were found"
      });
    }
    res.json(result);
  }catch(error){
      return res.status(500).json({
        "message": "Something went wrong: " + error
      })
  }
};

export const getGoal = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM goal WHERE id = ?",
      req.params.id
    );
    if (result.length <= 0) {
      return res.status(404).json({
        message: "Goal not found",
      });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong :(",
    });
  }
};

export const createGoal = async (req, res) => {
  try {
    const { name, userId, goalCategoryId, targetAmount } = req.body;
    const [result] = await pool.query(
      "INSERT INTO goal (name, user_id, goal_category_id, target_amount) VALUES (?, ?, ?, ?)",
      [name, userId, goalCategoryId, targetAmount]
    );
    res.send({
      id: result.insertId,
      name,
      userId,
      goalCategoryId,
      targetAmount
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}

export const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, userId, goalCategoryId, targetAmount } = req.body;
    const [result] = await pool.query(
      "UPDATE goal SET name = IFNULL(?, name), user_id = IFNULL(?, user_id), goal_category_id = IFNULL(?, goal_category_id), target_amount = IFNULL(?, target_amount) WHERE id = ?",
      [name, userId, goalCategoryId, targetAmount, id]
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Goal not found",
      });
    }

    const [goal] = await pool.query("SELECT * FROM goal WHERE id = ?", id);
    res.json(goal[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const deleteGoal = async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM goal WHERE id = ?",
      req.params.id
    );
    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Goal not found",
      });
    }
    res.status(204);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};