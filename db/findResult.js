import { pool } from "./databasePool.js";

export const findResult = async () => {
  const sql = "select examId,userId from enrolled_users where hasFinished = 1";
  const response = await pool.query(sql);
  return response;
};

export const findUserAnswers = async (examId, userId) => {
  const sql =
    "select answer,questionId from attempted_answers where examId = ? && userId = ?";
  const response = await pool.query(sql, [examId, userId]);
  return response;
};

export const findActualAnswers = async (examId, userId) => {
  const sql = "select answer ,id from questions where examId = ?";
  const response = await pool.query(sql, [examId]);
  return response;
};

export const findmarks = async (id) => {
  const sql = "select marks from questions where id = ?";
  const response = await pool.query(sql, [id]);
  return response;
};
