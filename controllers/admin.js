import { pool } from "../databasePool.js";
import { user_insert } from "../users.js";
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
const validateName = (name) => {
  if (name.length !== null && name.length >= 6) {
    return true;
  }
  return false;
};
export async function addTeachers(req, res) {
  try {
    if (req.user.role_name === "admin") {
      const { mail } = req.body;
      if (validateEmail(mail)) {
        await insert_teacher(mail);
      }
      res.send({ success: true });
    }
  } catch (e) {
    res.send({ success: false, error: e });
  }
}
export async function deleteTeachers(req, res) {
  try {
    if (req.user.role_name === "admin") {
      const { mail } = req.body;
      if (validateEmail(mail)) {
        await delete_teacher(mail);
      }
      res.send({ success: true });
    }
  } catch (e) {
    res.send({ success: false, error: e });
  }
}

export async function addAdmin(req, res) {
  try {
    if (
      req.user.role_name === "admin" &&
      req.user.email === "kiran123@gmail.com"
    ) {
      const { name, email, role_id, password } = req.body;
      const mail = validateEmail(email);
      const identity = validateName(password);
      console.log(identity);
      if (mail && identity) {
        user_insert(name, email, role_id, password);
        console.log("the insertion is success");
        return res.json({ success: true });
      }
      res.json({ success: true });
    }
  } catch (e) {
    res.send({ success: false, Error: e });
  }
}

// export function change_password
const insert_teacher = async (email) => {
  await pool.query("insert into teachers (emails) values (?)", [email]);
};

const delete_teacher = async (email) => {
  await pool.query("delete from teachers where emails = ?", [email]);
};
