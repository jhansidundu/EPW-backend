import dotenv from "dotenv";
import cron from "node-cron";
import {
  getPendingEnrollmentEmails,
  updateEnrollmentStatus,
} from "./db/enrollUsers.js";
import { findEnrollmentStatusId } from "./db/enrollmentStatus.js";
import { findExamDetailsById } from "./db/exams.js";
import {
  findActualAnswers,
  findPendingAttemptsToGrade,
  findUserAnswers,
  insertResult,
} from "./db/results.js";
import enrollmentTemplate from "./templates/enrollmentTemplate.js";
import { encrypt } from "./util/cryptUtil.js";
import { transporter } from "./util/emailUtil.js";
import { convertFractionToNumber } from "./util/numberUtil.js";

dotenv.config();

// send enrollment emails
cron.schedule("* * * * *", async () => {
  try {
    const pendingEmails = await getPendingEnrollmentEmails();
    const EMAIL_SENT_STATUS_ID = await findEnrollmentStatusId("EMAIL_SENT");
    const EMAIL_SENT_FAILED_STATUS_ID = await findEnrollmentStatusId(
      "EMAIL_SENT_FAILED"
    );

    for (const { enrollmentId, email, examId } of pendingEmails) {
      const examDetails = await findExamDetailsById(examId);
      const template = enrollmentTemplate;
      const uniqueUrl = encrypt("" + enrollmentId);
      const templateReplacements = {
        "\\[(Exam Name)\\]": examDetails.name,
        "\\[(Exam Date)\\]": examDetails.examDate,
        "\\[(Exam Duration)\\]": examDetails.duration,
        "\\[(Enrollment Link)\\]": `${process.env.CLIENT_BASE_URL}/student/enroll/${uniqueUrl}`,
      };

      let replacedTemplate = template;
      for (const key in templateReplacements) {
        replacedTemplate = replacedTemplate.replace(
          new RegExp(key, "g"),
          templateReplacements[key]
        );
      }
      try {
        // Send the email
        const mailOptions = {
          to: email,
          subject: `Invitation to enroll for the Exam`,
          html: replacedTemplate,
        };
        await transporter.sendMail(mailOptions);
        updateEnrollmentStatus(enrollmentId, EMAIL_SENT_STATUS_ID);
      } catch (err) {
        updateEnrollmentStatus(enrollmentId, EMAIL_SENT_FAILED_STATUS_ID);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

cron.schedule("* * * * *", async () => {
  const attempts = await findPendingAttemptsToGrade();
  for (const { examId, userId } of attempts) {
    if (userId && examId) {
      let userAnswers = await findUserAnswers(examId, userId);
      let answers = await findActualAnswers(examId, userId);

      let totalScore = 0;

      for (const ele of userAnswers) {
        const answer = answers.find((e) => e.questionId === ele.questionId);
        if (answer.answer === ele.answer) {
          totalScore += parseInt(answer.marks);
        } else if (!!answer.hasNegative) {
          totalScore -=
            convertFractionToNumber(answer.negativePercentage) * answer.marks;
        }
      }
      await insertResult({ examId, userId, result: totalScore });
    }
  }
});
