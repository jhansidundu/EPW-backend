import express from "express";
import { question_insert } from "./users.js";
import userRoutes from "./routes/auth.js";
import examRoute from "./routes/createExams.js";
import questionRoute from "./routes/questions.js";
import jwt from "jsonwebtoken";
import { authentication } from "./controllers/authentication.js";
import dotenv from "dotenv";
dotenv.config;
const app = express();
app.use(express.json());

app.use("/api/user", userRoutes);
app.use(authentication);
app.use("/api/exam", examRoute);
app.use("/api/question", questionRoute);

app.use((req, res, err) => {
  // console.error(err);
  // console.log(req);
  // console.log(res);

  res.status(500).send({ success: false, message: err });
});
app.listen(5000, () => {});
