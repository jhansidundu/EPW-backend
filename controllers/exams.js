import { pool } from "../db/databasePool.js";
import {
  findAllExamStatus,
  findExamDetailsById,
  findExamsByTeacher,
  findStudentEnrolledExams,
  insertExam,
  updateSettings,
} from "../db/exams.js";
import { checkIfExamIsActiveUtil } from "../util/dateUtil.js";
export async function createExam(req, res, next) {
  try {
    if (req.user.role !== "teacher") {
      res.status(403);
      throw new Error("Access denied");
    }

    const {
      name,
      examDate,
      duration,
      totalQuestions,
      lockBrowser,
      webcam,
      shuffleQuestions,
      negativeMarking,
      switchBetweenQuestions,
    } = req.body;

    const examId = await insertExam({
      name,
      examDate: new Date(examDate),
      duration,
      totalQuestions,
      createdBy: req.user.id,
      lockBrowser,
      webcam,
      shuffleQuestions,
      negativeMarking,
      switchBetweenQuestions,
    });
    await findExamDetailsById(examId);
    res.json({ success: true });
  } catch (e) {
    next(e);
  }
}

export const getExams = async (req, res, next) => {
  try {
    const user = req.user;
    const { status, recordsPerPage = 10, page = 1 } = req.query;
    const result = await findExamsByTeacher(user.id, {
      status,
      recordsPerPage,
      page,
    });
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

export const getExamDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await findExamDetailsById(id);
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

export const getExamswithId = async (req, res) => {
  try {
    const { id } = req.params;
    const user_Id = req.user.userId;
    const result = await pool.query(
      "select * from exams where created_by = ? and id = ?",
      [user_Id, id]
    );
    res.send({ success: true, data: result[0] });
  } catch (e) {
    res.status(500).send({ success: true, message: e });
  }
};

export const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;
    const user_Id = req.user.userId;
    const [result] = await pool.query(
      "delete from exams where created_by = ? and id = ?",
      [user_Id, id]
    );
    res.send({ success: true, data: result });
  } catch (e) {
    res.status(500).send({ success: true, message: e });
  }
};

export const getExamStatusList = async (req, res, next) => {
  try {
    const list = await findAllExamStatus();
    return res.json({ success: true, data: list });
  } catch (e) {
    next(e);
  }
};

export const updateExamSettings = async (req, res, next) => {
  try {
    if (req.user.role !== "teacher") {
      res.status(403);
      throw new Error("Access denied");
    }
    const {
      id,
      lockBrowser,
      webcam,
      shuffleQuestions,
      negativeMarking,
      switchBetweenQuestions,
    } = req.body;
    const result = await updateSettings({
      id,
      lockBrowser,
      webcam,
      shuffleQuestions,
      negativeMarking,
      switchBetweenQuestions,
    });
    return res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};

export const getStudentExams = async (req, res, next) => {
  try {
    const { email } = req.user;
    let exams = await findStudentEnrolledExams(email);
    if (!exams) {
      exams = [];
    }
    res.json({ success: true, data: exams });
  } catch (e) {
    next(e);
  }
};

export const checkIfExamisActive = async (req, res, next) => {
  try {
    const { examId } = req.params;
    const exam = await findExamDetailsById(examId);
    checkIfExamIsActiveUtil(exam);
    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
