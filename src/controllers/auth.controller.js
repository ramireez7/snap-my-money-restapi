import { pool } from "../db.js";
const jwt = await import("jsonwebtoken").then((module) => module.default);
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, savedPassword) => {
  return await bcrypt.compare(password, savedPassword);
};

export const login = async (req, res) => {
  try {
    const [users] = await pool.query("SELECT * FROM user");
    let email = req.body.email;
    let password = req.body.password;
    let user = users.find((user) => user.email === email);

    if (user) {
      const correctPassword = await comparePassword(password, user.password);
      if (correctPassword) {
        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign(
          {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
          },
          secretKey,
        );
        return res.json({ token, userId: user.id });
      } else {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
    } else {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const encryptedPassword = await encryptPassword(password);
    const [result] = await pool.query(
      "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
      [name, email, encryptedPassword]
    );
    return res.send({
      id: result.insertId,
      name,
      email,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};