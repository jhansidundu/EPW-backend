import { pool } from "./databasePool.js";

export const findRoleId = async (role) => {
  return await pool.query("SELECT id FROM roles WHERE name=?", [role]);
};
