import login from "../application/use_cases/auth/login";
import register from "../application/use_cases/auth/register";
import getAuthenticatedUserUsecase from "../application/use_cases/auth/getAuthenticatedUser";
import refreshTokenUsecase from "../application/use_cases/auth/refreshToken";

export default function authController(authRepository) {
  const loginUser = async (req, res, next) => {
    let { username, password } = req.body;

    try {
      let { token, refreshToken } = await login(
        username,
        password,
        authRepository,
      );

      res.json({ status: true, token, refreshToken });
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
      const authenticatedUser = await getAuthenticatedUserUsecase(
        id,
        authRepository,
      );

      res.json({ status: true, data: authenticatedUser });
    } catch (e) {
      next(e);
    }
  };

  const refreshToken = async (req, res, next) => {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    const refreshToken = authHeader && authHeader.split(" ")[1];

    if (!refreshToken) {
      res.status(401).json({
        status: false,
        "message": "Access Denied. No refresh token provided.",
      });
    }

    try {
      const { renewedToken, renewedRefreshToken } = await refreshTokenUsecase(
        refreshToken,
        authRepository,
      );

      res.json({
        status: true,
        token: renewedToken,
        refresh_token: renewedRefreshToken,
      });
    } catch (e) {
      next(e);
    }
  };

  return {
    loginUser,
    registerUser,
    getAuthenticatedUser,
    refreshToken,
  };
}
