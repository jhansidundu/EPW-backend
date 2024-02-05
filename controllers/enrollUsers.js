import { pool } from "../databasePool.js";

export async function EnrollUsers(req, res) {
  try {
    const { user_email, user_id, exam_id, registration_date, has_attempted } =
      req.body;
    // const id = await pool.query("select id from users where email = ?", [
    //   user_email,
    // ]);
    // console.log("this is id in enrollusers", id);
    if (req.user.role_name === "teacher") {
      await pool.query(
        "insert into enrolled_users (user_email,user_id,exam_id,registration_date,has_attempted) values (?,?,?,?,?) ",
        [user_email, user_id, exam_id, registration_date, has_attempted]
      );
      res.send({ success: true });
    }
  } catch (e) {
    res.send({ success: false, Error: e });
  }
}
