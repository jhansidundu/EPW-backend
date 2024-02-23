import nodemailer from "nodemailer";
const transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "suvindyajanu125@gmail.com",
    pass: "ariyana@123",
  },
});

export const sendEmail = (to, subject, html) => {
  const mailoptioins = {
    from: "suvindyajanu125@gmail.com",
    to,
    subject,
    html,
  };

  transpoter.sendMail(mailoptioins, (err, info) => {
    if (err) {
      return false;
    }

    return true;
  });
};

export const sendAns = (req, res, next) => {
  const { to, subject, html } = req.body;
  try {
    if (sendEmail(to, subject, html)) {
      res.send({ success: true, message: "mail successful sent" });
    } else {
      res.send({ success: false, message: "email not sent" });
    }
  } catch (e) {
    next(e);
  }
};
