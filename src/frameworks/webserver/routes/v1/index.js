import usersRoute from './users';
import express from 'express';

const routesV1 = () => {
  // I use different instances for each route, to avoid conflicts that may arise from express.
  const router = express.Router();

  router.use('/users', usersRoute());

  return router;
}

export default routesV1;