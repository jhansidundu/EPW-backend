import jwt from "jsonwebtoken";
// import { question_insert } from "../users.js";
import { pool } from "../databasePool.js";
// import { authentication } from "./authentication.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config;

export const addQuestions = (req, res) => {
  if (req.user.role_id === 1) {
    const dataArray = req.body.data;
    console.log(req.body);
    dataArray.forEach(async (item) => {
      const query = await question_insert(
        item.exam_id,
        item.question,
        item.option_A,
        item.option_B,
        item.option_C,
        item.option_D,
        item.answer,
        item.marks,
        item.has_negative,
        item.negative_percentage
      );
    });
    return res.send("success").end();
  }
  res.send("you dont have access to questions");
};

export const updatequestions = async (req, res) => {
  const { option_A, option_B, option_C, option_D } = req.body;
  const newQuestion = req.body.question;
  const newAns = req.body.answer;
  const { id } = req.params;
  const currentUser = req.user.userId;
  const created_by = await pool.query(
    "select exams.created_by from questions join exams on questions.exam_id = exams.id where questions.id = 1"
  );

  try {
    if (created_by) {
      const checkcurrenUser = created_by[0][0].created_by;
      if (currentUser === checkcurrenUser) {
        const updateQuestion = await pool.query(
          "update questions set question = ?,answer = ?,option_A = ?,option_B = ?, option_C = ?, option_D= ? where questions.id = ?",
          [newQuestion, newAns, option_A, option_B, option_C, option_D, id]
        );
      } else {
        console.log("currentuser not equal to  checkcurrentUser");
      }
    } else {
      console.log("user not get");
    }

    res.send({ success: true });
  } catch (e) {
    res.send({ success: false, message: e });
  }
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
