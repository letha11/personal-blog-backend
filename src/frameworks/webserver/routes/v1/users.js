import express from "express";
import UserRepository from "../../../../application/interfaces/userRepositoryInterface";
import userRepositoryImpl from "../../../sequelize/repositories/userRepositoryImpl";
import userController from "../../../../controllers/userController";
import authServiceInterface from "../../../../application/interfaces/authServiceInterface";
import authServiceImpl from "../../../services/authService";
import config from "../../../../config/config";
import authMiddleware from "../../middlewares/authMiddleware";

const usersRoute = () => {
  // I use different instances for each route, to avoid conflicts that may arise from express.
  const router = express.Router();

  const controller = userController(
    new UserRepository(
      userRepositoryImpl(authServiceInterface(authServiceImpl(config))),
    ),
  );

  router.route("/").get(
    controller.getAll,
  );

  router
    .use(authMiddleware)
    .route("/")
    .put(controller.update)
    .delete(controller.deleteUser);

  router
    .route("/:id")
    .get(controller.getUserById);

  return router;
};

export default usersRoute;
