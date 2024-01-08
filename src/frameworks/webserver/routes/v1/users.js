import express from "express";
import UserRepository from "../../../../application/interfaces/userRepositoryInterface";
// import dbModels from "../../../sequelize/models";
import userRepositoryImpl from "../../../sequelize/repositories/userRepositoryImpl";
import userController from "../../../../controllers/userController";
import authServiceInterface from "../../../../application/interfaces/authServiceInterface";
import authServiceImpl from "../../../services/authService";

const usersRoute = () => {
  // I use different instances for each route, to avoid conflicts that may arise from express.
  const router = express.Router();

  const controller = userController(
    new UserRepository(userRepositoryImpl()),
    authServiceInterface(authServiceImpl()),
  );

  router.route("/").get(controller.getAll).post(controller.addNewUser);

  router
    .route("/:id")
    .get(controller.getUserById)
    .put(controller.update)
    .delete(controller.deleteUser);

  return router;
};

export default usersRoute;
