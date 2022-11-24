const errorHandlingMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode ?? 500;
  console.error(err);
};

export default errorHandlingMiddleware;