import express from "express";
import { pool } from "../databasePool.js";

export const answers = async (req, res) => {
  console.log(req.body);
  const {
    user_id,
    exam_id,
    candidate_answer,
    question_id,
    created_at,
    updated_at,
  } = req.body;
  try {
    await pool.query(
      "insert into attempted_answers (user_id,exam_id,candidate_answer,question_id,created_at,updated_at) values (?,?,?,?,?,?)",
      [user_id, exam_id, candidate_answer, question_id, created_at, updated_at]
    );
    res.send({ success: true });
  } catch (e) {
    console.log(e);
    res.send({ success: false, Error: e });
  }
};