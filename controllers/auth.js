import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { pool } from "../databasePool.js";
import { user_insert } from "../users.js";

dotenv.config();

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const validateName = (name) => {
  if (name.length !== null && name.length >= 6) {
    return true;
  }
  return false;
};
export const registerUser = (req, res) => {
  const { name, email, role_id, password } = req.body;
  console.log(req.body);
  const mail = validateEmail(email);
  const identity = validateName(name);
  let note;
  if (mail && identity) {
    note = user_insert(name, email, role_id, password);
  }

  res.send(note);
};

export const validatePass = async (req, res) => {
  try {
    const { Email, Pas } = req.body;
    let result = await pool.query("select * from users where email = ?", [
      Email,
    ]);
    result = result[0][0];
    if (result) {
      // const res = result.rows[0];
      const pas = result.password;
      const validation = await bcrypt.compare(Pas, pas);
      if (validation) {
        const user = {
          userId: result.id,
          email: result.email,
          role_id: result.role_id,
        };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken: accessToken });
        // res.status(200).json("VALID PASS");
      } else {
        res.json("wrong pass");
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json("Something broke");
  }
};
