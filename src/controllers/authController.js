import login from "../application/use_cases/auth/login";

export default function authController(authRepository) {
  const loginUser = async (req, res, next) => {
    let { username, password } = req.body;

    try {
      let result = await login(username, password, authRepository);

      res.json({ status: true, token: result });
    } catch (e) {
      next(e);
    }
  };

  return {
    loginUser,
  };
}
