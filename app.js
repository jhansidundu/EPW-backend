import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import routes from "./routes/index.js";
import { errorHandler, notFound } from "./util/middleware.js";
import "./crons.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT ? process.env.PORT : 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
