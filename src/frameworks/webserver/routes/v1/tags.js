import express from "express";
import authMiddleware from "../../middlewares/authMiddleware";
import roleMiddleware from "../../middlewares/roleMiddleware";
import tagController from "../../../../controllers/tagController";
import TagRepositoryImpl from "../../../sequelize/repositories/tagRepositoryImpl";
import TagRepositoryInterface from "../../../../application/interfaces/tagRepositoryInterface";

const tagsRoutes = () => {
  const router = express.Router();

  const controller = tagController(
    new TagRepositoryInterface(new TagRepositoryImpl()),
  );
  router
    .route("/")
    .get(controller.findAll);

  router
    .route("/:id")
    .get(controller.getById);

  router.use([authMiddleware, roleMiddleware(["admin"])]);

  router
    .route("/")
    .post(controller.add);

  router
    .route("/:id")
    .put(controller.update)
    .delete(controller.del);

  return router;
};

export default tagsRoutes;
