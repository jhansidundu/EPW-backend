import { createEnrollment } from "../db/enrollUsers.js";
import { validateEmail } from "../util/validations.js";

export const enrollUsers = async (req, res, next) => {
  try {
    if (req.user.role !== "teacher") {
      res.status(403);
      throw new Error("Access denied");
    }
    const { emails, examId, status } = req.body;
    const validEmails = emails.filter((email) => validateEmail(email));
    const invalidEmails = emails.filter((email) => !validateEmail(email));
    console.log(validEmails);
    console.log(invalidEmails);
    for (const email of validEmails) {
      console.log(email);
      await createEnrollment({ email, examId, status });
    }
    res.send({ success: true, data: { invalidEmails } });
  } catch (err) {
    next(err);
  }
};
