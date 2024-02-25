import { pool } from "../db/databasePool.js";
import {
  delQuestion,
  findQuestion,
  findQuestionsByExamForTeacher,
  insert,
  update,
  findallQuestionsByexamId,
} from "../db/questions.js";

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
      res.json({ success: true, data: result });
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
    res.json({ success: true, data: result });
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

export const getQuestionByexamId = async (req, res, next) => {
  try {
    const { examId } = req.params;
    let [[{ duration, examDate }]] = await pool.query(
      "select duration,examDate from exams where id =?",
      [examId]
    );
    let d = new Date(examDate);
    duration = duration + 2;
    let v = new Date();
    const currentDate = new Date();
    v.setMinutes(d.getMinutes() + duration);
    console.log(v);
    console.log(duration);
    if (isBetweenDates(currentDate, examDate, v)) {
      console.log("sueessss");
    }
    function isBetweenDates(currentDate, examDate, v) {
      return currentDate >= examDate && currentDate <= v;
    }
    if (!duration) {
      throw new Error("examid not exist");
    }
    const response = await findallQuestionsByexamId(examId);
    console.log(response);
    res.send(response[0]);
  } catch (e) {
    next(e);
  }
};
