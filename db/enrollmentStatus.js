import { pool } from "./databasePool.js";

export const findAllEnrollmentStatus = async () => {
  const sql = `SELECT * FROM enrollment_status`;
  const [result] = await pool.query(sql);
  return result;
};

export const findEnrollmentStatusId = async (status) => {
  const sql = `
    SELECT id FROM enrollment_status 
    WHERE status=?
    `;
  const [[result]] = await pool.query(sql, [status]);
  if (result) {
    return result.id;
  } else return null;
};
