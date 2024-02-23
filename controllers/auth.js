import bcrypt from "bcrypt";
import dotenv from "dotenv";

import { findRoleId } from "../db/roles.js";
import { checkIfEmailExists } from "../db/teachers.js";
import { getUserByEmail, insertUser } from "../db/user.js";
import { createPasswordHash } from "../util/crypt.js";
import { validateEmail, validateName } from "../util/validations.js";
import { generateAccessToken } from "../util/jwtUtil.js";

dotenv.config();

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!role || (role !== "teacher" && role !== "student")) {
      res.status("400");
      throw new Error("Invalid input");
    }
    if (role === "teacher") {
      const [[{ exist }]] = await checkIfEmailExists(email);
      if (!exist) {
        res.status(403);
        throw new Error("Access denied! Please contact admin");
      }
    }
    const emailValid = validateEmail(email);
    const passwordValid = validateName(password);

    if (emailValid && passwordValid) {
      const hashedPassword = await createPasswordHash(password);
      const [[{ id: roleId }]] = await findRoleId(role);
      await insertUser(name, email, roleId, hashedPassword);

      // fetch the saved user
      const [[existingUser]] = await getUserByEmail(email);
      const user = {
        id: existingUser.id,
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
      res.status("400");
      throw new Error("Invalid input");
    }
  } catch (e) {
    next(e);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    const [[existingUser]] = await getUserByEmail(email);

    if (existingUser) {
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
        res.status(401);
        throw new Error("Invalid Credentials");
      }
    } else {
      res.status(401);
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
