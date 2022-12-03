const errorHandlingMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode ?? 500;
  console.error(err);

  res.status(statusCode).json({
		success: false,
		error: err.name,
		message: err.message ? err.message : "Something went wrong",
  });
};

export default errorHandlingMiddleware;