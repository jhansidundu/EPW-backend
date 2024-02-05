import express from "express";
import cors from "cors";
import { question_insert } from "./users.js";
import userRoutes from "./routes/auth.js";
import examRoute from "./routes/exams.js";
import questionRoute from "./routes/questions.js";
import jwt from "jsonwebtoken";
import { authentication } from "./controllers/authentication.js";
import mailSent from "./routes/email.js";
import { sendAns } from "./controllers/email.js";
import dotenv from "dotenv";
import adminFunc from "./routes/admin.js";
import enrollusers from "./routes/enrollUsers.js";
dotenv.config;
const app = express();

app.use(express.json());

app.use(cors());
app.use("/api/user", userRoutes);
app.use(authentication);
app.use("/api/enrollment", enrollusers);
app.use("/api/admin", adminFunc);
app.use("/api/exam", examRoute);
app.use("/api/question", questionRoute);
// app.use(sendAns);
// app.use("/send-email", mailSent);

app.use((req, res, err) => {
  // console.error(err);
  // console.log(req);
  // console.log(res);

  res.status(500).send({ success: false, message: err });
});
app.listen(5000, () => {});
