import express from 'express';

const usersRoute = () => {
  // I use different instances for each route, to avoid conflicts that may arise from express.
  const router = express.Router();

  router.get('/', (req, res) => {
    return res.json({ message: 'Hello World!' });
  });

  return router;
}

export default usersRoute;
