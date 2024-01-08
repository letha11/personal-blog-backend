import routesV1 from "./v1/index";

const initRoutes = (app) => {
  app.use("/api/v1", routesV1());
};

export default initRoutes;
