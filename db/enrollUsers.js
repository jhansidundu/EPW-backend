import { pool } from "./databasePool.js";

export const createEnrollment = async ({ email, examId, status }) => {
  const sql = `INSERT INTO enrolled_users (email, examId, status) values (?,?,?)`;
  const [{ insertId }] = await pool.query(sql, [email, examId, status]);
  return insertId;
};

export const getPendingEnrollmentEmails = async () => {
  const sql = `
  SELECT eu.id as enrollmentId, email, examId FROM enrolled_users eu 
  JOIN enrollment_status es ON eu.status=es.id
  WHERE es.status=? LIMIT 10
  `;
  const [result] = await pool.query(sql, "PENDING");
  return result;
};

export const updateEnrollmentStatus = async (id, status) => {
  const sql = `UPDATE enrolled_users SET status=? WHERE id=?`;
  await pool.query(sql, [status, id]);
};

export const findEnrolledUsers = async (examId) => {
  const sql = `
  SELECT 
    eu.id as enrollmentId, 
    eu.email, u.name as username,
    eu.registrationDate,
    eu.hasAttempted, es.label as status
  FROM enrolled_users eu 
  JOIN enrollment_status es 
    ON eu.status=es.id
  LEFT JOIN users u
    ON u.email=eu.email
  WHERE eu.examId=?`;
  const [result] = await pool.query(sql, [examId]);
  return result;
};

export const findEnrollmentByEnrollmentId = async (enrollmentId) => {
  const sql = `SELECT * FROM enrolled_users WHERE id=?`;
  const [[result]] = await pool.query(sql, [enrollmentId]);
  return result;
};

export const findEnrollmentByUserIdAndExamId = async ({ userId, examId }) => {
  const sql = `SELECT * FROM enrolled_users WHERE userId=? AND examId=?`;
  const [[result]] = await pool.query(sql, [userId, examId]);
  return result;
};

export const completeEnrollment = async ({
  enrollmentId,
  userId,
  registrationDate,
  status,
}) => {
  const sql = `
    UPDATE enrolled_users SET
    userId=?, registrationDate=?, status=?
    WHERE id=?
  `;
  await pool.query(sql, [userId, registrationDate, status, enrollmentId]);
};

export const updateHasAttempted = async (enrollmentId) => {
  const sql = `
    UPDATE enrolled_users 
    SET hasAttempted=? WHERE id=?
  `;
  await pool.query(sql, [true, enrollmentId]);
};

export const updateHasFinished = async (enrollmentId) => {
  const sql = `
    UPDATE enrolled_users 
    SET hasFinished=? WHERE id=?
  `;
  await pool.query(sql, [true, enrollmentId]);
};
