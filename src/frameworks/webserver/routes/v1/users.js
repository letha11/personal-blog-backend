import express from "express";
import UserRepository from "../../../../application/interfaces/userRepositoryInterface";
// import dbModels from "../../../sequelize/models";
import userRepositoryImpl from "../../../sequelize/repositories/userRepositoryImpl";
import userController from "../../../../controllers/userController";

const usersRoute = () => {
  // I use different instances for each route, to avoid conflicts that may arise from express.
  const router = express.Router();

  const controller = userController(new UserRepository(userRepositoryImpl()));

  router.get("/", controller.getAll);
  router.get("/test", controller.add);

  return router;
};

export default usersRoute;
