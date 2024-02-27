import { pool } from "./databasePool.js";

export const saveAnswersforTheExam = async (
  examId,
  questionId,
  answerOption,
  userId,
  updatedAt,
  createdAt
) => {
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

export const isHeAnswerBefore = async (examId, questionId) => {
  const sql = `select createdAt from attempted_answers where examId = ? && questionId = ?`;

  const response = await pool.query(sql, [examId, questionId]);
  return response;
};
