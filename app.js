import express from "express";
import { question_insert } from "./users.js";
import userRoutes from "./routes/auth.js";
import examRoute from "./routes/exams.js";
import questionRoute from "./routes/questions.js";
import jwt from "jsonwebtoken";
import { authentication } from "./controllers/authentication.js";
import dotenv from "dotenv";
dotenv.config;
const app = express();
app.use(express.json());
app.use(authentication);
app.use("/api/user", userRoutes);
app.use("/api/exam", examRoute);
app.use("/api/question", questionRoute);
// app.post("/questions", authentication, (req, res) => {
//   console.log(req.user);
//   if (req.user.role_id === 1) {
//     const dataArray = req.body.data;
//     console.log(req.body);
//     dataArray.forEach((item) => {
//       const query = question_insert(
//         item.exam_id,
//         item.question,
//         item.option_A,
//         item.option_B,
//         item.option_C,
//         item.option_D,
//         item.answer,
//         item.marks,
//         item.has_negative,
//         item.negative_percentage
//       );
//     });
//     return res.send("success").end();
//   }
//   res.send("you dont have access to questions");
// });

// function authentication(req, res, next) {
//   const authHead = req.headers["authorization"];
//   console.log(authHead);
//   const token = authHead && authHead.split(" ")[1];
//   if (token == null) {
//     res.sendStatus(404);
//   }

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) {
//       res.sendStatus(403);
//     }
//     req.user = user;
//     next();
//   });
// }

app.use((req, res, err) => {
  // console.error(err);
  // console.log(req);
  // console.log(res);

  res.status(500).send("something broke");
});
app.listen(5000, () => {});
