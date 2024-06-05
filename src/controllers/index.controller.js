import {pool} from "../db.js";
import { config } from "dotenv";
config();
export const ping = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT "Pong" AS result');
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong - " + process.env.PORT + " -" +process.env.DB_HOST + " -" +process.env.DB_PORT + " -" +process.env.DB_USER + " -" +process.env.DB_PASSWORD + " -" +process.env.DB_DATABASE
    });
  }
};