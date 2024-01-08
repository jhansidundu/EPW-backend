import { pool } from "../databasePool.js";
export const getExams = async (req, res) => {
  try {
    const user_id = 3;
    const result = await pool.query(
      "select * from exams where created_by = ?",
      [id]
    );
    console.log(result);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(500).send("didn't get exams");
  }
};

export const getExamswithId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user_Id = req.user.userId;
    console.log(user_Id);
    const result = await pool.query(
      "select * from exams where created_by = ? and id = ?",
      [user_Id, id]
    );
    res.send({ success: true, data: result[0] });
  } catch (e) {
    console.log(e);
    res.status(500).send({ success: true, message: e });
  }
};
