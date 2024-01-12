import express from "express";
import postController from "../../../../controllers/postController";
import PostRepositoryInterface from "../../../../application/interfaces/postRepositoryInterface";
import PostRepositoryImpl from "../../../sequelize/repositories/postRepositoryImpl";
// import authServiceInterface from "../../../../application/interfaces/authServiceInterface";
// import authServiceImpl from "../../../services/authService";
import authMiddleware from "../../middlewares/authMiddleware";
import roleMiddleware from "../../middlewares/roleMiddleware";

const postsRoute = () => {
  const router = express.Router();

  const controller = postController(
    new PostRepositoryInterface(new PostRepositoryImpl()),
    // authServiceInterface(authServiceImpl()),
  );
  router
    .route("/")
    .get(controller.findAll);

  router
    .use([authMiddleware, roleMiddleware(["admin"])])
    .route("/")
    .post(controller.add)
    .put(controller.update)
    .delete(controller.del);

  router
    .route("/:id")
    .get(controller.getById);

  return router;
};

export default postsRoute;
