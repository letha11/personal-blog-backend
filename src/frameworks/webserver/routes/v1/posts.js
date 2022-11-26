import express from "express";

const postsRoute = () => {
  const router = express.Router();

  router
    .route("/")
    .get((req, res, next) => {
			throw new Error('error nih bos');
      res.json({ success: true, message: "Hello worlde" });
    })
    .post((req, res, next) => {});

  router
    .route("/:id")
    .get((req, res, next) => {})
    .put((req, res, next) => {})
    .delete((req, res, next) => {});

  return router;
};

export default postsRoute;
