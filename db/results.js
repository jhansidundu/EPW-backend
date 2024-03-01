import { pool } from "./databasePool.js";

export const findPendingAttemptsToGrade = async () => {
  const sql = `
  SELECT eu.examId, eu.userId 
  FROM enrolled_users eu 
  LEFT JOIN results r  
    ON (eu.userId=r.userId AND eu.examId=r.examId)
  WHERE eu.hasFinished = 1
    AND r.id IS NULL
  LIMIT 5
  `;
  const [result] = await pool.query(sql);
  return result;
};

export const findUserAnswers = async (examId, userId) => {
  const sql = `SELECT answer, questionId from attempted_answers 
    WHERE examId=? AND userId=?`;
  const [result] = await pool.query(sql, [examId, userId]);
  return result;
};

export const findActualAnswers = async (examId) => {
  const sql = `
  SELECT answer, id AS questionId, marks, hasNegative, negativePercentage
  FROM questions WHERE examId=?`;
  const [result] = await pool.query(sql, [examId]);
  return result;
};

export const insertResult = async ({ examId, userId, result }) => {
  const sql = `INSERT INTO results (examId, userId, results)
    VALUES (?, ?, ?)
  `;
  await pool.query(sql, [examId, userId, result]);
};

export const findStudentResult = async ({ examId, userId }) => {
  const sql = `SELECT * FROM results WHERE examId=? AND userId=?`;
  const [[result]] = await pool.query(sql, [examId, userId]);
  return result;
};
