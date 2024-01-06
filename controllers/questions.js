import jwt from "jsonwebtoken";
import { user_insert } from "../users.js";
// import { authentication } from "./authentication.js";
import dotenv from "dotenv";
dotenv.config;

export const addQuestions = (req, res) => {
  if (req.user.role_id === 1) {
    const dataArray = req.body.data;
    console.log(req.body);
    dataArray.forEach((item) => {
      const query = question_insert(
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
