import bcrypt from "bcrypt";
export const user_insert = async function (name) {
  const validPass = await bcrypt.hash(name, 10);

  return validPass;
};

const res = await user_insert("kiran123");
console.log(res);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImVtYWlsIjoia2lyYW4xMjNAZ21haWwuY29tIiwicm9sZV9pZCI6MywiaWF0IjoxNzA2ODc2NDkyfQ.-dvZhiULKbtjR9fDMf59ejqd2ztwDIaU0v1UiWJ5hew
// teacher eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImVtYWlsIjoibWFyaTEyQGdtYWlsLmNvbSIsInJvbGVfaWQiOjEsInJvbGVfbmFtZSI6InRlYWNoZXIiLCJpYXQiOjE3MDcyMzY0MDh9._9_u70o_tH_8YRNE9DLEl5JDlFZuI6GTgkJHVZJQx8U
// {
//     "data" : [
//     {"exam_id": 1,
//     "question": "who is biggest star in world",
//     "option_A": "emma",
//     "option_B": "swift",
//     "option_C": "selena",
//     "option_D": "justin",
//     "answer": "A",
//     "marks": 10,
//     "has_negative": 0,
//     "negative_percentage": 0
//     },
//     {
//         "exam_id": 1,
//     "question": "who is biggest star in india",
//     "option_A": "amitabhacchan",
//     "option_B": "sharukhan",
//     "option_C": "hritik roshan",
//     "option_D": "deepika",
//     "answer": "A",
//     "marks": 10,
//     "has_negative": 0,
//     "negative_percentage": 0
//     }
//     ]

// }
