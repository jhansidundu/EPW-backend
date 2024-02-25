import { pool } from "../db/databasePool.js";
import { findStudentEnrolledExams } from "../db/exams.js";
import { findExamDetails } from "../db/exams.js";
export const studentExams = async (req, res) => {
  const { userId } = req.body;
  const response = await findStudentEnrolledExams(userId);
  // console.log("res", response[0]);
  const allExamIds = response[0];
  for (const x in allExamIds) {
    console.log(x);
    const { examId } = allExamIds[x];
    console.log(examId);
    const resonse = await findExamDetails(examId);
    console.log(resonse[0]);
    res.send(resonse[0]);
    return;
  }

  // const [[{ id, name, examDate, duration, totalQuestions }]] =
  //   await findExamDetailsById(userId);
  // console.log(examId);
};
