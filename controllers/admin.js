import { checkIfEmailExists, insertTeacher } from "../db/teachers.js";
import { insertUser } from "../db/user.js";
import { ROLES } from "../util/constants.js";
import { createPasswordHash } from "../util/cryptUtil.js";
import { validateEmail, validateName } from "../util/validations.js";

export async function addTeacher(req, res, next) {
  try {
    if (req.user.role !== "admin") {
      res.status(403);
      throw new Error("Access denied");
    }
    const { email } = req.body;
    if (!validateEmail(email)) {
      res.status(400);
      throw new Error("Email is invalid");
    }

    // check if email already exists
    const [[{ count }]] = await checkIfEmailExists(email);

    if (count > 0) {
      res.status(400);
      throw new Error("Email already exists");
    }
    await insertTeacher(email);
    res.send({ success: true });
  } catch (e) {
    next(e);
  }
}

// delete teacher is different
// export async function deleteTeacher(req, res) {
//   try {
//     if (req.user.role_name === "admin") {
//       const { mail } = req.body;
//       if (validateEmail(mail)) {
//         await deleteTeacher(mail);
//       }
//       res.send({ success: true });
//     }
//   } catch (e) {
//     res.send({ success: false, error: e });
//   }
// }

export async function addAdmin(req, res, next) {
  try {
    const user = req.user;
    if (user.role !== ROLES.ADMIN) {
      res.status(403);
      throw new Error("Access denied");
    }
    const { name, email, roleId, password } = req.body;
    const mail = validateEmail(email);
    const identity = validateName(password);
    if (mail && identity) {
      const hashedPassword = await createPasswordHash(password);
      await insertUser({ name, email, roleId, password: hashedPassword });
      return res.json({ success: true });
    }
    return res.json({ success: true });
  } catch (e) {
    next(e);
  }
}
