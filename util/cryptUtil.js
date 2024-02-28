import bcrypt from "bcrypt";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

export const createPasswordHash = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const encrypt = (text) => {
  const SECRET_KEY = process.env.LINK_SECRET;
  const iv = crypto.randomBytes(16); // initialization vector
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(SECRET_KEY),
    Buffer.from(iv)
  ); // create cipher object
  const crypted = cipher.update(text, "utf8", "hex") + cipher.final("hex"); // encrypt text
  return iv.toString("hex") + crypted; // prepend iv for decryption
};

export const decrypt = (text) => {
  const SECRET_KEY = process.env.LINK_SECRET;
  const iv = Buffer.from(text.slice(0, 32), "hex"); // initialization vector
  const cipherText = Buffer.from(text.slice(32), "hex"); // actual encrypted text
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(SECRET_KEY),
    Buffer.from(iv)
  );

  return decipher.update(cipherText, "hex", "utf8") + decipher.final("utf8");
};
