import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import routes from "./routes/index.js";
import { errorHandler, notFound } from "./util/middleware.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server started.");
});
