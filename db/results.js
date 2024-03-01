import { pool } from "./databasePool.js";

export const findPendingAttemptsToGrade = async () => {
  const sql = `
  SELECT eu.examId, eu.userId 
  FROM enrolled_users eu 
  LEFT JOIN results r  
    ON (eu.userId=r.userId & eu.examId=r.examId)
  WHERE eu.hasFinished = 1
    AND r.id IS NULL
  LIMIT 5
  `;
  const [result] = await pool.query(sql);
  return result;
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
