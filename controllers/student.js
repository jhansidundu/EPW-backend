import {
  previousSavedAnswer,
  saveAttemptedAnswer,
  updateAttemptedAnswer,
} from "../db/attemptedAnswers.js";
import { pool } from "../db/databasePool.js";
import { completeEnrollment, findEnrollment } from "../db/enrollUsers.js";
import { findEnrollmentStatusId } from "../db/enrollmentStatus.js";
import { decrypt } from "../util/cryptUtil.js";

export const finishExam = async (req, res, next) => {
  const { examId, createdAt, updatedAt } = req.body;
  try {
  } catch (err) {
    next(err);
  }
};

export const saveAnswer = async (req, res, next) => {
  try {
    if (req.user.role !== "student") {
      throw new Error("Access denied");
    }
    const { examId, questionId, answerOption } = req.body;
    const updatedAt = new Date();
    let created = new Date();
    const previousAnswer = await previousSavedAnswer(examId, questionId);
    if (previousAnswer) {
      await updateAttemptedAnswer({
        newAnswer: answerOption,
        answerId: previousAnswer.id,
        updatedAt,
      });
    } else {
      await saveAttemptedAnswer({
        examId,
        questionId,
        answerOption,
        userId: req.user.id,
        updatedAt,
        created,
      });
    }
    res.send({ success: true });
  } catch (e) {
    next(e);
  }
};

export const completeStudentAutoEnrollment = async (req, res, next) => {
  try {
    const user = req.user;
    let { enrollmentId } = req.body;
    if (user) {
      enrollmentId = decrypt(enrollmentId);
      const enrollment = await findEnrollment(enrollmentId);
      if (user.email !== enrollment.email) {
        res.status(400);
        throw new Error("Access denied");
      } else {
        if (enrollment.userId && enrollment.registrationDate) {
          return res.json({ success: true });
        } else {
          const registrationDate = new Date();
          const status = await findEnrollmentStatusId("ENROLLED");
          const userId = user.id;
          await completeEnrollment({
            enrollmentId,
            registrationDate,
            status,
            userId,
          });
          return res.json({ success: true });
        }
      }
    } else {
      return res.json({
        success: true,
        data: {
          authenticated: false,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};

export const completeStudentEnrollment = async (req, res, next) => {
  try {
    const user = req.user;
    const { enrollmentId } = req.body;
    if (user) {
      const enrollment = await findEnrollment(enrollmentId);
      if (user.email !== enrollment.email) {
        res.status(403);
        throw new Error("Access denied");
      } else {
        if (enrollment.userId && enrollment.registrationDate) {
          return res.json({ success: true });
        } else {
          const registrationDate = new Date();
          const status = await findEnrollmentStatusId("ENROLLED");
          const userId = user.id;
          await completeEnrollment({
            enrollmentId,
            registrationDate,
            status,
            userId,
          });
          return res.json({ success: true });
        }
      }
    } else {
      return res.json({
        success: true,
        data: {
          authenticated: false,
        },
      });
    }
  } catch (err) {
    next(err);
  }
};
