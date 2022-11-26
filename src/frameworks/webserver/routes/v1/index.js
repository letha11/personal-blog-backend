import usersRoute from "./users";
import postsRoute from "./posts";
import express from "express";

const routesV1 = () => {
  // I use different instances for each route, to avoid conflicts that may arise from express.
  const router = express.Router();

  router.use("/users", usersRoute());
	router.use("/posts", postsRoute());

  return router;
};

export default routesV1;
