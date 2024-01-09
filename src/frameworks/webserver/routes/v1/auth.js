import express from "express";
import authController from "../../../../controllers/authController";
import AuthRepositoryImpl from "../../../sequelize/repositories/authRepositoryImpl";
import UserRepositoryInterface from "../../../../application/interfaces/userRepositoryInterface";
import userRepositoryImpl from "../../../sequelize/repositories/userRepositoryImpl";
import authServiceInterface from "../../../../application/interfaces/authServiceInterface";
import authServiceImpl from "../../../services/authService";
import config from "../../../../config/config";

const authRoute = () => {
  const router = express.Router();

  const controller = authController(
    new AuthRepositoryImpl(
      new UserRepositoryInterface(
        userRepositoryImpl(),
      ),
      authServiceInterface(authServiceImpl(config)),
    ),
  );

  router.route("/login").post(controller.loginUser);

  return router;
};

export default authRoute;
