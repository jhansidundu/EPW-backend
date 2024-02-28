export const checkIfExamIsActiveUtil = (exam) => {
  const startTime = new Date(exam.examDate);
  const duration = exam.duration + 2;
  let currentTime = new Date();
  const endTime = addMinutesToDate(startTime, duration);
  if (currentTime <= startTime) {
    return { message: "Exam has not started", isActive: false };
  }
  if (currentTime >= endTime) {
    return { message: "Exam has ended", isActive: false };
  }
  return { isActive: true };
};

function addMinutesToDate(date, minutes) {
  // Create a new Date object from the original date
  const newDate = new Date(date.getTime());

  // Add the specified number of minutes to the new Date object
  newDate.setMinutes(newDate.getMinutes() + minutes);

  // Return the new date object
  return newDate;
}
