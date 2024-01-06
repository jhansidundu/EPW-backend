import { authentication } from "./authentication.js";

import { pool } from "../databasePool.js";
export function createExam(req, res) {
  console.log(req.user.role_id);
  if (req.user.role_id === 1) {
    const { created_by, start_time, duration, total_questions } = req.body;
    console.log(created_by);
    const res = exam_insert(created_by, start_time, duration, total_questions);
    console.log(res);
  }
  //   res.send("success");
}

const exam_insert = (created_by, start_time, duration, total_questions) => {
  const result = pool.query(
    "insert into exams (created_by,start_time,duration,total_questions) values ( ?,?,?,?)",
    [created_by, start_time, duration, total_questions]
  );
  return result;
};
