import express from "express";
import postController from "../../../../controllers/postController";
import PostRepositoryInterface from "../../../../application/interfaces/postRepositoryInterface";
import PostRepositoryImpl from "../../../sequelize/repositories/postRepositoryImpl";

const postsRoute = () => {
  const router = express.Router();

  const controller = postController(
    new PostRepositoryInterface(new PostRepositoryImpl())
  );

  router
    .route("/")
    .get((req, res, next) => {
      res.json({ success: true, message: "Hello worlde" });
    })
    .post((req, res, next) => {});

  router
    .route("/:id")
    .get(controller.getPostById)
    .put((req, res, next) => {})
    .delete((req, res, next) => {});

  return router;
};

export default postsRoute;
