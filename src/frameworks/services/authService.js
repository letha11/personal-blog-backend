import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default function authServiceImpl(config) {
  const encryptPassword = async (pass) => {
    const hashedPass = await bcrypt.hash(pass, 10);
    return hashedPass;
  };

  const checkPassword = async (password, hashedPassword) =>
    await bcrypt.compare(password, hashedPassword);

  const generateToken = async (payload) =>
    await jwt.sign(payload, config.TOKEN_SECRET, { expiresIn: "7d" });

  const verifyToken = async (token) =>
    await jwt.verify(token, config.TOKEN_SECRET);

  return {
    encryptPassword,
    checkPassword,
    generateToken,
    verifyToken,
  };
}
