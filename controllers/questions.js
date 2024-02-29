import { findExamDetailsById } from "../db/exams.js";
import {
  delQuestion,
  findQuestion,
  findQuestionsByExamForStudent,
  findQuestionsByExamForTeacher,
  insert,
  update,
} from "../db/questions.js";
import { checkIfExamIsActiveUtil } from "../util/dateUtil.js";

export const addQuestion = async (req, res, next) => {
  try {
    if (req.user.role !== "teacher") {
      res.status(403);
      throw new Error("Access denied");
    }
    const {
      examId,
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      answer,
      marks,
      hasNegative,
      negativePercentage,
    } = req.body;

    const questionId = await insert({
      examId,
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      answer,
      marks,
      hasNegative,
      negativePercentage,
    });

    return res.json({ success: true, data: { questionId } });
  } catch (err) {
    next(err);
  }
};

export const updateQuestion = async (req, res, next) => {
  try {
    if (req.user.role !== "teacher") {
      res.status(403);
      throw new Error("Access denied");
    }
    const {
      id,
      examId,
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      answer,
      marks,
      hasNegative,
      negativePercentage,
    } = req.body;

    await update({
      id,
      examId,
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      answer,
      marks,
      hasNegative,
      negativePercentage,
    });
    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const getQuestionsByExam = async (req, res, next) => {
  try {
    if (req.user.role === "teacher") {
      const { examId } = req.params;
      let result = await findQuestionsByExamForTeacher(examId);
      if (!result) {
        result = [];
      }
      return res.json({ success: true, data: result });
    }
  } catch (e) {
    next(e);
  }
};

export const getQuestion = async (req, res, next) => {
  try {
    if (req.user.role !== "teacher") {
      res.status(403);
      throw new Error("Access denied");
    }
    const { questionId } = req.params;
    const result = await findQuestion(questionId);
    return res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const deleteQuestion = async (req, res, next) => {
  try {
    if (req.user.role !== "teacher") {
      res.status(403);
      throw new Error("Access denied");
    }
    const { questionId } = req.params;
    await delQuestion(questionId);
    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const getQuestionsByExamIdForStudents = async (req, res, next) => {
  try {
    const { examId } = req.params;
    const exam = await findExamDetailsById(examId);

    const { isActive, message } = checkIfExamIsActiveUtil(exam);
    if (isActive) {
      const questions = await findQuestionsByExamForStudent({
        examId,
        userId: req.user.id,
      });
      return res.json({ success: true, data: questions });
    } else {
      return res.json({ success: false, message });
    }
  } catch (e) {
    next(e);
  }
};
