import { ValidationError } from "sequelize";

const errorHandlingMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode ?? 500;

  if (err instanceof ValidationError) statusCode = 400;

  console.error(err);

  res.status(statusCode).json({
    success: false,
    error: err.name,
    message: err.message ? err.message : "Something went wrong",
  });
};

export default errorHandlingMiddleware;
