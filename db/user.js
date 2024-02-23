import { pool } from "./databasePool.js";

export const getUserByEmail = async (email) => {
  return await pool.query(
    "select u.*, r.name as role from users u join roles r on u.roleId=r.id where email = ?",
    [email]
  );
};

export const insertUser = async (name, email, roleId, password) => {
  console.log(name, email, roleId, password);
  return await pool.query(
    "INSERT INTO users (name, email, roleId, password) VALUES (?, ?, ?, ?)",
    [name, email, roleId, password]
  );
};
