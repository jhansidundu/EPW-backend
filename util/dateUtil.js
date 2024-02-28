export const checkIfExamIsActiveUtil = (exam) => {
  const startTime = new Date(exam.examDate);
  const duration = exam.duration + 2;
  let currentTime = new Date();
  const endTime = new Date();
  endTime.setMinutes(startTime.getMinutes() + duration);
  if (currentTime <= startTime) {
    res.status(400);
    throw new Error("Exam has not started");
  }
  if (currentTime >= endTime) {
    res.status(400);
    throw new Error("Exam has ended");
  }
};
