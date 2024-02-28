import nodemailer from "nodemailer";
const emailConfig = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "jyotichalla01@gmail.com",
    pass: "cvem qnyn cybd fvxl",
  },
};

export const transporter = nodemailer.createTransport(emailConfig);
