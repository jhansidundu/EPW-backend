import { pool } from "../databasePool.js";
import { authentication } from "./authentication.js";
export async function createExam(req, res) {
  try {
    console.log(req.user.role_id);
    if (req.user.role_id === 1) {
      const { created_by, start_time, duration, total_questions, exam_name } =
        req.body;
      console.log("this is req.body in the createexam", req.body);
      console.log("in create exam", created_by);
      const result = await exam_insert(
        created_by,
        start_time,
        duration,
        total_questions,
        exam_name
      );
      console.log("inserted result in  createdexam", result);
    }
    console.log("user logged in is not a teacher");
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
export const getExams = async (req, res) => {
  try {
    const user_id = 3;
    const result = await pool.query(
      "select * from exams where created_by = ?",
      [id]
    );
    console.log(result);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send("didn't get exams");
  }
};
export const getQuestionsWithExam = async (req, res) => {
  try {
    console.log("this is console log in getqueswithexam");
    if (req.user.role_name === "student") {
      console.log("2this is console log in getqueswithexam");

      const { exam_id } = req.body;
      const res = await pool.query(
        "select question,option_A,option_B,option_C,option_C, marks from questions where exam_id = ?",
        [exam_id]
      );
      console.log("3this is console log in getqueswithexam");

      console.log(res[0]);
    }
    res.send({ success: true });
  } catch (e) {
    res.send({ success: false, Error: e });
  }
};
export const getExamDetails = async (req, res) => {
  try {
    if (req.user.role_name === "student") {
      const { exam_id } = req.body;
      const res = await pool.query(
        "select  start_time , duration,total_questions, exam_name  from exams where id = ?",
        [exam_id]
      );
      console.log(res[0]);
      res.send({ success: true });
    }
  } catch (e) {
    res.send({ success: false, Error: e });
  }
};

export const getExamswithId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user_Id = req.user.userId;
    console.log(user_Id);
    const result = await pool.query(
      "select * from exams where created_by = ? and id = ?",
      [user_Id, id]
    );
    res.send({ success: true, data: result[0] });
  } catch (e) {
    console.log(e);
    res.status(500).send({ success: true, message: e });
  }
};

export const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user_Id = req.user.userId;
    console.log(user_Id);
    const result = await pool.query(
      "delete from exams where created_by = ? and id = ?",
      [user_Id, id]
    );
    res.send({ success: true, data: result[0] });
  } catch (e) {
    console.log(e);
    res.status(500).send({ success: true, message: e });
  }
};
// oh shanthi
// omm shanthi
