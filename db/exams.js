import { pool } from "./databasePool.js";

export const insertExam = async ({
  name,
  examDate,
  duration,
  totalQuestions,
  createdBy,
  lockBrowser,
  webcam,
  shuffleQuestions,
  negativeMarking,
  switchBetweenQuestions,
}) => {
  const [{ insertId }] = await pool.query(
    `INSERT INTO exams (
        name, examDate, duration, totalQuestions, createdBy, lockBrowser, webcam, shuffleQuestions, 
        negativeMarking, switchBetweenQuestions
    ) VALUES (?,?,?,?,?,?,?,?,?,?)`,
    [
      name,
      examDate,
      duration,
      totalQuestions,
      createdBy,
      lockBrowser,
      webcam,
      shuffleQuestions,
      negativeMarking,
      switchBetweenQuestions,
    ]
  );
  return insertId;
};

export const findExamsByTeacher = async (teacherId, filters) => {
  const { status, recordsPerPage, page } = filters;
  let sql = `
    SELECT id, name, status FROM exams WHERE createdBy=?
    ${status ? "AND status='" + filters.status + "'" : ""}
    LIMIT ${(page - 1) * recordsPerPage}, ${recordsPerPage} 
  `;

  const [result] = await pool.query(sql, [teacherId]);
  return result;
};

export const findExamDetailsById = async (examId) => {
  const sql = `SELECT * FROM exams WHERE id=?`;
  const [[result]] = await pool.query(sql, [examId]);
  return result;
};

export const findAllExamStatus = async () => {
  const sql = `SELECT * FROM exam_status`;
  const [result] = await pool.query(sql);
  return result;
};

export const updateSettings = async ({
  lockBrowser,
  webcam,
  shuffleQuestions,
  negativeMarking,
  switchBetweenQuestions,
  id,
}) => {
  const sql = `
  UPDATE exams 
  SET 
    lockBrowser=?, webcam=?, shuffleQuestions=?,
    negativeMarking=?, switchBetweenQuestions=?
  WHERE id=?
  `;
  await pool.query(sql, [
    lockBrowser,
    webcam,
    shuffleQuestions,
    negativeMarking,
    switchBetweenQuestions,
    id,
  ]);
};
export const findStudentEnrolledExams = async (userId) => {
  const response = pool.query(
    "select examId from enrolled_users where userId = ?",
    [userId]
  );
  return response;
};

export const findExamDetails = async (examId) => {
  const sql =
    "select id, name, examDate, duration, totalQuestions from exams where id =?";
  const res = await pool.query(sql, [examId]);

  return res;
};
