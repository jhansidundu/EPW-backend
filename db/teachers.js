import { pool } from "./databasePool.js";

export const checkIfEmailExists = async (email) => {
  return await pool.query(`SELECT COUNT(*) count FROM teachers WHERE email=?`, [
    email,
  ]);
};

export const insertTeacher = async (email) => {
  await pool.query("INSERT INTO teachers (email) VALUES (?)", [email]);
};

export const deleteTeacher = async (email) => {
  await pool.query("DELETE FROM teachers WHERE email=?", [email]);
};
