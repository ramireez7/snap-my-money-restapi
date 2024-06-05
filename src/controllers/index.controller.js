import {pool} from "../db.js";
import {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
} from "./config.js";

export const ping = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT "Pong" AS result');
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong - " + "HOST " + DB_HOST + " PORT " + DB_PORT + " USER " + DB_USER + " PASSWORD " + DB_PASSWORD + " DATABASE " + DB_DATABASE,
    });
  }
};