import { pool } from "./databasePool.js";
import bcrypt from "bcrypt";
// const bcryp = require("bcrypt");

export const user_insert = async function (name, email, role_id, password) {
  const validPass = await bcrypt.hash(password, 10);
  const result = pool.query(
    "insert into users (name,email,role_id,password) values (?,?,?,?)",
    [name, email, role_id, validPass]
  );
  return result;
};

export const question_insert = function (
  exam_id,
  question,
  option_A,
  option_B,
  option_C,
  option_D,
  answer,
  marks,
  has_negative,
  negative_percentage
) {
  const result = pool.query(
    "insert into questions (exam_id,question,option_A,option_B,option_C,option_D,answer,marks,has_negative,negative_percentage) values (?,?,?,?,?,?,?,?,?,?) ",
    [
      exam_id,
      question,
      option_A,
      option_B,
      option_C,
      option_D,
      answer,
      marks,
      has_negative,
      negative_percentage,
    ]
  );
  return result;
};
// password hashing
// user password ni valid chesi jwt token
