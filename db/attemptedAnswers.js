import { pool } from "./databasePool.js";

export const saveAttemptedAnswer = async ({
  examId,
  questionId,
  answerOption,
  userId,
  updatedAt,
  createdAt,
}) => {
  const sql = `INSERT INTO attempted_answers (
      examId, questionId, answer, userId, updatedAt, createdAt
    ) 
    VALUES (?,?,?,?,?,?)`;
  await pool.query(sql, [
    examId,
    questionId,
    answerOption,
    userId,
    updatedAt,
    createdAt,
  ]);
  return true;
};

export const previousSavedAnswer = async ({ examId, questionId, userId }) => {
  const sql = `SELECT * FROM attempted_answers WHERE examId=? AND questionId=? AND userId=?`;
  const [[result]] = await pool.query(sql, [examId, questionId, userId]);
  return result;
};

export const updateAttemptedAnswer = async ({
  answerId,
  updatedAt,
  newAnswer,
}) => {
  const sql = `
    UPDATE attempted_answers 
        SET answer=?, updatedAt=?    
    WHERE id=?`;
  await pool.query(sql, [newAnswer, updatedAt, answerId]);
};
