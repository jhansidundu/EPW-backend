import bcrypt from "bcrypt";

export const createPasswordHash = async (password) => {
  return await bcrypt.hash(password, 10);
};
