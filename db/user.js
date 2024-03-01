import { pool } from "./databasePool.js";

export const findUserByEmail = async (email) => {
  const [[user]] = await pool.query(
    "select u.*, r.name as role from users u join roles r on u.roleId=r.id where email = ?",
    [email]
  );
  return user;
};

export const insertUser = async ({
  name,
  email,
  roleId,
  password,
  isVerified,
}) => {
  const sql = `INSERT INTO users (name, email, roleId, password, isVerified) VALUES (?, ?, ?, ?, ?)`;
  return await pool.query(sql, [name, email, roleId, password, isVerified]);
};

export const verifyUser = async (email) => {
  const sql = `UPDATE users SET isVerified=? WHERE email=?`;
  await pool.query(sql, [1, email]);
};
