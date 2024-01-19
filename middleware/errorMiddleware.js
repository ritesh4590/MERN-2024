const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Backend Error";
  const extraDetails = err.extraDetails;

  return res.status(status).send({ message, extraDetails });
};

export default errorHandler;
