export default function authServiceInterface(serviceImpl) {
  const encryptPassword = async (pass) =>
    await serviceImpl.encryptPassword(pass);

  const checkPassword = async (password, hashedPassword) =>
    await serviceImpl.checkPassword(password, hashedPassword);

  const generateToken = async (payload) =>
    await serviceImpl.generateToken(payload);

  const verifyToken = async (token) => await serviceImpl.verifyToken(token);

  return {
    encryptPassword,
    checkPassword,
    generateToken,
    verifyToken,
  };
}
