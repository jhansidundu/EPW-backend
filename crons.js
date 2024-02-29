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
import { response } from "express";
import { findResult } from "./db/findResult.js";

import { findUserAnswers } from "./db/findResult.js";
import { findActualAnswers } from "./db/findResult.js";
import { findmarks } from "./db/findResult.js";
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

cron.schedule("* * * * *", async () => {
  let response = await findResult();
  console.log(response);
  // const examId = response[0][0].examId;
  // const userId = response[0][0].userId;
  console.log(examId, userId);
  for (const ele in response[0]) {
    let examId = ele.examId;
    let userId = ele.userId;

    if (userId && examId) {
      let userAns = await findUserAnswers(examId, userId);
      let realAns = await findActualAnswers(examId, userId);

      console.log(userAns);
      console.log(realAns);
      let hisresult = 0;
      // for (let i = 0; i < Math.min(userAns[0].length, realAns[0].length); i++) {
      //   console.log(array1[i], array2[i]);
      // }

      for (let key1 in userAns[0]) {
        const right = false;
        for (let key2 in realAns[0]) {
          if (key1.answer === key2.answer && key1.questionId === key2.id) {
            const howmuchmarks = findmarks(key1.questionId);
            hisresult = hisresult + howmuchmarks[0][0].marks;
          }
        }
      }
    }
  }
});
