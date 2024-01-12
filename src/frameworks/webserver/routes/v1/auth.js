import express from "express";
import authController from "../../../../controllers/authController";
import AuthRepositoryImpl from "../../../sequelize/repositories/authRepositoryImpl";
import UserRepositoryInterface from "../../../../application/interfaces/userRepositoryInterface";
import userRepositoryImpl from "../../../sequelize/repositories/userRepositoryImpl";
import authServiceInterface from "../../../../application/interfaces/authServiceInterface";
import authServiceImpl from "../../../services/authService";
import config from "../../../../config/config";
import authMiddleware from "../../middlewares/authMiddleware";

const authRoute = () => {
  const router = express.Router();
  const authService = authServiceInterface(authServiceImpl(config));

  const controller = authController(
    new AuthRepositoryImpl(
      new UserRepositoryInterface(
        userRepositoryImpl(authService),
      ),
      authService,
    ),
  );

  router.route("/login").post(controller.loginUser);
  router.route("/register").post(controller.registerUser);
  router.use(authMiddleware).route("/user").get(controller.getAuthenticatedUser);

  return router;
};

export default authRoute;
