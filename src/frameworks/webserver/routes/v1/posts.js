import express from "express";
import postController from "../../../../controllers/postController";
import PostRepositoryInterface from "../../../../application/interfaces/postRepositoryInterface";
import PostRepositoryImpl from "../../../sequelize/repositories/postRepositoryImpl";
import authServiceInterface from "../../../../application/interfaces/authServiceInterface";
import authServiceImpl from "../../../services/authService";

const postsRoute = () => {
  const router = express.Router();

  const controller = postController(
    new PostRepositoryInterface(new PostRepositoryImpl()),
		// authServiceInterface(authServiceImpl()),
  );

  router
    .route("/")
    .get(controller.findAll)
    .post(controller.add);

  router
    .route("/:id")
    .get(controller.getById)
    .put(controller.update)
    .delete(controller.del);

  return router;
};

export default postsRoute;
