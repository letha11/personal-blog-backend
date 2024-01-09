export default function authServiceInterface(serviceImpl) {
  const encryptPassword = async (pass) =>
    await serviceImpl.encryptPassword(pass);

  const checkPassword = async (password, hashedPassword) =>
    await serviceImpl.checkPassword(password, hashedPassword);

  const generateToken = async (username) =>
    await serviceImpl.generateToken(username);

  const verifyToken = async (token) => await serviceImpl.verifyToken(token);

  return {
    encryptPassword,
    checkPassword,
    generateToken,
    verifyToken,
  };
}
