import { saveAnswersforTheExam } from "../db/studentAnswers.js";
import { isHeAnswerBefore } from "../db/studentAnswers.js";
export const studentAnswersforExam = async (req, res, next) => {
  try {
    console.log(req.user);
    if (req.user.role !== "student") {
      throw new Error("Access denied");
    }
    const { examId, questionId, answerOption } = req.body;
    const updatedAt = new Date();
    let created = new Date();
    const answeredBefore = await isHeAnswerBefore(examId, questionId);
    console.log(answeredBefore[0][0]);
    if (answeredBefore[0][0]) {
      created = answeredBefore[0][0].createdAt;
    }

    const userId = req.user.id;
    await saveAnswersforTheExam(
      examId,
      questionId,
      answerOption,
      userId,
      updatedAt,
      created
    );
    res.send({ success: true });
  } catch (e) {
    next(e);
  }
};
