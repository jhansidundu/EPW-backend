import { pool } from "./databasePool.js";

export const findQuestionsByExamForTeacher = async (examId) => {
  const sql = `SELECT * FROM questions WHERE examId=?`;
  const [result] = await pool.query(sql, [examId]);
  return result;
};

export const findQuestion = async (questionId) => {
  const sql = `SELECT * FROM questions WHERE id=?`;
  const [[result]] = await pool.query(sql, [questionId]);
  return result;
};

export const insert = async ({
  examId,
  question,
  optionA,
  optionB,
  optionC,
  optionD,
  answer,
  marks,
  hasNegative,
  negativePercentage,
}) => {
  const sql = `
  INSERT INTO questions (
    examId, question, optionA, optionB, optionC, optionD, 
    answer, marks, hasNegative, negativePercentage
  ) 
  VALUES (?,?,?,?,?,?,?,?,?,?)`;
  const [{ insertId }] = await pool.query(sql, [
    examId,
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    answer,
    marks,
    hasNegative,
    negativePercentage,
  ]);
  return insertId;
};

export const update = async ({
  id,
  question,
  optionA,
  optionB,
  optionC,
  optionD,
  answer,
  marks,
  hasNegative,
  negativePercentage,
}) => {
  const sql = `
  UPDATE questions set question=?, optionA=?, optionB=?, 
    optionC=?, optionD=?, answer=?, marks=?, 
    hasNegative=?, negativePercentage=?
  WHERE id=?`;
  await pool.query(sql, [
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    answer,
    marks,
    hasNegative,
    negativePercentage,
    id,
  ]);
};

export const delQuestion = async (questionId) => {
  const sql = `DELETE FROM questions WHERE id=?`;
  await pool.query(sql, [questionId]);
};

export const findQuestionsByExamForStudent = async ({ examId, userId }) => {
  console.log(examId, userId);
  const sql = `
    SELECT 
      q.id, q.question, q.optionA, 
      q.optionB, q.optionC, q.optionD, 
      q.marks, q.hasNegative, q.negativePercentage, 
      CASE WHEN aa.answer IS NULL THEN '' ELSE aa.answer END as answer
    FROM questions q LEFT JOIN attempted_answers aa 
    ON q.id=aa.questionId
    WHERE q.examId=? AND (aa.userId IS NULL OR aa.userId=?)`;
  const [result] = await pool.query(sql, [examId, userId]);
  return result;
};
