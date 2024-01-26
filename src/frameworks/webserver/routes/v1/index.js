// import usersRoute from "./users";
import postsRoute from "./posts";
import express from "express";
import authRoute from "./auth";
import tagsRoutes from "./tags";

const routesV1 = () => {
  // I use different instances for each route, to avoid conflicts that may arise from express.
  const router = express.Router();

  // router.use("/users", usersRoute());
	router.use("/posts", postsRoute());
  router.use("/auth", authRoute());
  router.use("/tags", tagsRoutes());

  return router;
};

export default routesV1;
