import cron from "node-cron";
import { transporter } from "./util/emailUtil.js";
import {
  getPendingEnrollmentEmails,
  updateEnrollmentStatus,
} from "./db/enrollUsers.js";
import { findExamDetailsById } from "./db/exams.js";
import enrollmentTemplate from "./templates/enrollmentTemplate.js";
import { findEnrollmentStatusId } from "./db/enrollmentStatus.js";
import { encrypt } from "./util/cryptUtil.js";

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
        "\\[(Enrollment Link)\\]": `http://localhost:5173/student/enroll/${uniqueUrl}`,
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
