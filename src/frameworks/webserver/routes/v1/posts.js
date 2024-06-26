import express from "express";
import postController from "../../../../controllers/postController";
import PostRepositoryInterface from "../../../../application/interfaces/postRepositoryInterface";
import PostRepositoryImpl from "../../../sequelize/repositories/postRepositoryImpl";
import authMiddleware from "../../middlewares/authMiddleware";
import roleMiddleware from "../../middlewares/roleMiddleware";

const postsRoute = () => {
  const router = express.Router();

  const controller = postController(
    new PostRepositoryInterface(new PostRepositoryImpl()),
  );
  router
    .route("/")
    .get(controller.findAll);

  router
    .route("/:id")
    .get(controller.getById);

  // all routes below this line will have this middlewares
  router.use([authMiddleware, roleMiddleware(["admin"])]);

  router
    .route("/")
    .post(controller.add)

  router
    .route("/:id")
    .put(controller.update)
    .delete(controller.del);

  return router;
};

export default postsRoute;
