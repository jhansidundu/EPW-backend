import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { findRoleId } from "../db/roles.js";
import { checkIfEmailExists } from "../db/teachers.js";
import { findUserByEmail, insertUser, verifyUser } from "../db/user.js";
import template from "../templates/verifyEmailTemplate.js";
import { createPasswordHash, decrypt, encrypt } from "../util/cryptUtil.js";
import { transporter } from "../util/emailUtil.js";
import { generateAccessToken } from "../util/jwtUtil.js";
import { validateEmail, validateName } from "../util/validations.js";

dotenv.config();

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!role || (role !== "teacher" && role !== "student")) {
      res.status("400");
      throw new Error("Invalid input");
    }

    const emailValid = validateEmail(email);
    const passwordValid = validateName(password);

    if (!(emailValid && passwordValid)) {
      res.status("400");
      throw new Error("Invalid input");
    }

    const hashedPassword = await createPasswordHash(password);

    if (role === "teacher") {
      await handleTeacherSignup(name, email, hashedPassword, role);
      return res.json({ success: true });
    } else if (role === "student") {
      await handleStudentSignup(name, email, hashedPassword, role);
      return res.json({ success: true });
    }
  } catch (e) {
    next(e);
  }
};

const handleTeacherSignup = async (name, email, password, role) => {
  const [[{ count }]] = await checkIfEmailExists(email);
  if (count === 0) {
    res.status(403);
    throw new Error("Access denied! Please contact admin");
  }
  const [[{ id: roleId }]] = await findRoleId(role);
  await insertUser({
    name,
    email,
    roleId,
    password,
    isVerified: true,
  });

  // send verification email
  const uniqueUrl = encrypt(email);
  const templateReplacements = {
    "\\[(User Name)\\]": name,
    "\\[(Verification Link)\\]": `${process.env.FRONTEND_URL}/teacher/verify/${uniqueUrl}`,
  };

  let replacedTemplate = template;
  for (const key in templateReplacements) {
    replacedTemplate = replacedTemplate.replace(
      new RegExp(key, "g"),
      templateReplacements[key]
    );
  }
  // Send the email
  const mailOptions = {
    to: email,
    subject: `Account Verification`,
    html: replacedTemplate,
  };
  await transporter.sendMail(mailOptions);
};

const handleStudentSignup = async (name, email, password, role) => {
  const [[{ id: roleId }]] = await findRoleId(role);
  await insertUser({
    name,
    email,
    roleId,
    password,
    isVerified: false,
  });

  // send verification email
  const uniqueUrl = encrypt(email);
  const templateReplacements = {
    "\\[(User Name)\\]": name,
    "\\[(Verification Link)\\]": `${process.env.FRONTEND_URL}/student/verify/${uniqueUrl}`,
  };

  let replacedTemplate = template;
  for (const key in templateReplacements) {
    replacedTemplate = replacedTemplate.replace(
      new RegExp(key, "g"),
      templateReplacements[key]
    );
  }
  // Send the email
  const mailOptions = {
    to: email,
    subject: `Account Verification`,
    html: replacedTemplate,
  };
  await transporter.sendMail(mailOptions);
};

export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      if (!existingUser.isVerified) {
        res.status(403);
        throw new Error("Please verify your email");
      }
      if (existingUser.role !== role) {
        res.status(403);
        throw new Error("Access denied");
      }
      const hashedPassword = existingUser.password;
      const validation = await bcrypt.compare(password, hashedPassword);
      if (validation) {
        const { id, name, email, role } = existingUser;
        const user = {
          id,
          name,
          email,
          role,
        };
        const accessToken = generateAccessToken(user);
        return res.json({
          success: true,
          data: { accessToken, role, username: name },
        });
      } else {
        res.status(400);
        throw new Error("Invalid Credentials");
      }
    } else {
      res.status(400);
      throw new Error("Invalid Credentials");
    }
  } catch (e) {
    next(e);
  }
};

export const validateToken = async (req, res, next) => {
  try {
    const user = req.user;
    if (user) {
      return res.json({ success: true });
    } else {
      res.status(401);
      throw new Error("Invalid accessToken ");
    }
  } catch (e) {
    next(e);
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    let { email } = req.params;
    email = decrypt(email);
    const user = await findUserByEmail(email);
    if (user) {
      if (!user.isVerified) {
        await verifyUser(email);
      }
      return res.json({ success: true });
    } else {
      res.status(400);
      throw new Error("Invalid Link");
    }
  } catch (err) {
    next(err);
  }
};
