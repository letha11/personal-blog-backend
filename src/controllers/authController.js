import login from "../application/use_cases/auth/login";
import register from "../application/use_cases/auth/register";
import getById from "../application/use_cases/user/getById";
import getAuthenticatedUserUsecase from "../application/use_cases/auth/getAuthenticatedUser";

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

  const registerUser = async (req, res, next) => {
    let { name, username, email, password } = req.body;

    try {
      let { token, newUser } = await register(
        name,
        username,
        email,
        password,
        authRepository,
      );

      res.json({ status: true, token, user: newUser });
    } catch (e) {
      next(e);
    }
  };

  const getAuthenticatedUser = async (req, res, next) => {
    const id = req.id; // from auth middleware

    try {
      const authenticatedUser = await getAuthenticatedUserUsecase(id, authRepository);

      res.json({ status: true, data: authenticatedUser });
    } catch (e) {
      next(e);
    }
  };

  return {
    loginUser,
    registerUser,
    getAuthenticatedUser,
  };
}
