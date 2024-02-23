import { pool } from "./databasePool.js";

export const createEnrollment = async ({ email, examId }) => {
  const sql = `INSERT INTO enrolled_users (email, examId) values (?,?)`;
  const [{ insertId }] = await pool.query(sql, [email, examId]);
  console.log(insertId);
};
