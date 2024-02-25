import { pool } from "./databasePool.js";

export const createEnrollment = async ({ email, examId, status }) => {
  const sql = `INSERT INTO enrolled_users (email, examId,status) values (?,?,?)`;
  const [{ insertId }] = await pool.query(sql, [email, examId, status]);
  console.log(insertId);
};
