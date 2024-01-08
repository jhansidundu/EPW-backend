import { authentication } from "./authentication.js";

import { pool } from "../databasePool.js";
export async function createExam(req, res) {
  try {
    console.log(req.user.role_id);
    if (req.user.role_id === 1) {
      const { created_by, start_time, duration, total_questions, exam_name } =
        req.body;
      console.log(created_by);
      const res = await exam_insert(
        created_by,
        start_time,
        duration,
        total_questions,
        exam_name
      );
      console.log(res);
    }
    res.json({ success: false });
  } catch (e) {
    res.json({ success: false, message: e });
  }
}

const exam_insert = async (
  created_by,
  start_time,
  duration,
  total_questions,
  exam_name
) => {
  const result = await pool.query(
    "insert into exams (created_by,start_time,duration,total_questions,exam_name) values ( ?,?,?,?,?)",
    [created_by, start_time, duration, total_questions, exam_name]
  );
  return result;
};
