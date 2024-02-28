import { createEnrollment, findEnrolledUsers } from "../db/enrollUsers.js";
import { findEnrollmentStatusId } from "../db/enrollmentStatus.js";
import { validateEmail } from "../util/validations.js";

export const enrollUsers = async (req, res, next) => {
  try {
    if (req.user.role !== "teacher") {
      res.status(403);
      throw new Error("Access denied");
    }
    const { emails, examId, url } = req.body;
    const validEmails = emails.filter((email) => validateEmail(email));
    const invalidEmails = emails.filter((email) => !validateEmail(email));
    const failedEmails = [];

    const enrollmentStatusId = await findEnrollmentStatusId("PENDING");
    for (const email of validEmails) {
      try {
        await createEnrollment({ email, examId, status: enrollmentStatusId });
      } catch (e) {
        failedEmails.push(email);
      }
    }
    if (failedEmails.length > 0) {
      return res.send({
        success: false,
        data: { invalidEmails, failedEmails },
      });
    }
    return res.send({ success: true, data: { invalidEmails } });
  } catch (err) {
    next(err);
  }
};

export const getEnrolledUsers = async (req, res, next) => {
  try {
    const { examId } = req.params;
    if (req.user.role !== "teacher") {
      res.status(403);
      throw new Error("Access denied");
    }
    const enrollments = await findEnrolledUsers(examId);
    return res.json({ success: true, data: enrollments });
  } catch (err) {
    next(err);
  }
};
