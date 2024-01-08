import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config;

export function authentication(req, res, next) {
  const authHead = req.headers["authorization"];
  console.log("authhead", authHead);
  const token = authHead && authHead.split(" ")[1];
  if (token == null) {
    res.sendStatus(404);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(403);
    }

    req.user = user;
    console.log(req.user);
    next();
  });
}
