import { pool } from "../db/databasePool.js";
import { findStudentEnrolledExams } from "../db/exams.js";
import { findExamDetails } from "../db/exams.js";
export const studentExams = async (req, res) => {
  try {
    const { userId } = req.body;
    const response = await findStudentEnrolledExams(userId);
    // console.log("res", response[0]);
    const allExamIds = response[0];
    let result = [];
    for (const x in allExamIds) {
      console.log(x);
      const { examId } = allExamIds[x];
      console.log(examId);
      const res = await findExamDetails(examId);
      console.log(res[0][0]);
      result.push(res[0][0]);
    }
    res.send(result);
    // const [[{ id, name, examDate, duration, totalQuestions }]] =
    //   await findExamDetailsById(userId);
    // console.log(examId);
  } catch (e) {
    next(e);
  }
};
