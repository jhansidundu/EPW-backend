import {
  previousSavedAnswer,
  saveAttemptedAnswer,
  updateAttemptedAnswer,
} from "../db/attemptedAnswers.js";
import {
  completeEnrollment,
  findEnrollmentByEnrollmentId,
  findEnrollmentByUserIdAndExamId,
  updateEnrollmentStatus,
  updateHasAttempted,
  updateHasFinished,
} from "../db/enrollUsers.js";
import { findEnrollmentStatusId } from "../db/enrollmentStatus.js";
import { findExamDetailsById } from "../db/exams.js";
import { decrypt } from "../util/cryptUtil.js";
import { checkIfExamIsActiveUtil } from "../util/dateUtil.js";

export const markStartExam = async (req, res, next) => {
  try {
    const { examId } = req.params;
    const userId = req.user.id;
    const enrollment = await findEnrollmentByUserIdAndExamId({
      userId,
      examId,
    });
    if (!enrollment.hasAttempted) {
      await updateHasAttempted(enrollment.id);
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const finishExam = async (req, res, next) => {
  try {
    const questions = req.body;
    const { examId } = req.params;
    const exam = await findExamDetailsById(examId);
    const { isActive, message } = checkIfExamIsActiveUtil(exam);
    if (isActive) {
      for (const question of questions) {
        const createdAt = new Date();
        const updatedAt = new Date();
        const previousAnswer = await previousSavedAnswer({
          examId,
          questionId: question.questionId,
          userId: req.user.id,
        });
        if (previousAnswer) {
          await updateAttemptedAnswer({
            newAnswer: question.answer,
            answerId: previousAnswer.id,
            updatedAt,
          });
        } else {
          await saveAttemptedAnswer({
            examId,
            questionId: question.questionId,
            answerOption: question.answer,
            userId: req.user.id,
            createdAt,
            updatedAt,
          });
        }
      }
      const enrollment = await findEnrollmentByUserIdAndExamId({
        userId: req.user.id,
        examId,
      });
      await updateHasFinished(enrollment.id);
      const ATTEMPTED_STATUS_ID = await findEnrollmentStatusId("ATTEMPTED");
      await updateEnrollmentStatus(enrollment.id, ATTEMPTED_STATUS_ID);
      return res.json({ success: true });
    } else {
      return res.json({ success: false, message });
    }
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
    const exam = await findExamDetailsById(examId);
    const { isActive, message } = checkIfExamIsActiveUtil(exam);
    if (isActive) {
      const updatedAt = new Date();
      const createdAt = new Date();
      const previousAnswer = await previousSavedAnswer({
        examId,
        questionId,
        userId: req.user.id,
      });
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
          createdAt,
        });
      }
      return res.json({ success: true });
    } else {
      return res.json({ success: false, message });
    }
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
      const enrollment = await findEnrollmentByEnrollmentId(enrollmentId);
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
      const enrollment = await findEnrollmentByEnrollmentId(enrollmentId);
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
