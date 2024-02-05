import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { pool } from "../databasePool.js";
// import { user_insert } from "../users.js";

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
  try {
    const { name, email, role_id, password } = req.body;
    if (role_id === 1) {
      let isTeacher = pool.query(
        "select emails from teachers where emails = ?",
        [email]
      );
      if (isTeacher) {
        console.log(req.body);
        const mail = validateEmail(email);
        const identity = validateName(password);
        console.log(identity);
        if (mail && identity) {
          user_insert(name, email, role_id, password);
          console.log("the insertion is success");
          return res.json({ success: true });
        }
        res.json({ success: false });
      }
    } else if (role_id === 2) {
      const mail = validateEmail(email);
      const identity = validateName(password);
      console.log(identity);
      if (mail && identity) {
        user_insert(name, email, role_id, password);
        console.log("the insertion is success");
        return res.json({ success: true });
      }
      res.json({ success: false });
    }
  } catch (e) {
    res.json({ success: false, message: e });
  }
};

export const validatePass = async (req, res) => {
  try {
    const { Email, Pas } = req.body;
    console.log("this console log is sigin request body", req.body);
    let result = await pool.query("select * from users where email = ?", [
      Email,
    ]);
    result = result[0][0];
    console.log(result);
    if (result) {
      // const res = result.rows[0];
      const pas = result.password;
      const validation = await bcrypt.compare(Pas, pas);
      if (validation) {
        const role_name = await pool.query(
          "select role_name from roles where id =?",
          [result.role_id]
        );
        const user = {
          userId: result.id,
          email: result.email,
          role_id: result.role_id,
          role_name: role_name[0][0].role_name,
        };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        console.log("login successful");
        return res.json({ success: true, data: accessToken });
        // res.status(200).json("VALID PASS");
      } else {
        return res.json("wrong pass");
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: fail, message: e });
  }
};

// import { pool } from "./databasePool.js";
// import bcrypt from "bcrypt";
// const bcryp = require("bcrypt");

export const user_insert = async function (name, email, role_id, password) {
  const validPass = await bcrypt.hash(password, 10);
  const result = pool.query(
    "insert into users (name,email,role_id,password) values (?,?,?,?)",
    [name, email, role_id, validPass]
  );
  return result;
};
