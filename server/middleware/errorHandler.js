const notFoundHandler = (req, res, next) => {
    const error = new Error('Not found.');
    error.status = 404;
    next(error);
};

const errorHandler = (error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Internal server error";
    res.status(status).send(message);
};

module.exports = { notFoundHandler, errorHandler };
