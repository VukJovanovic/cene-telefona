const AppError = require('../utils/appError');

// Handle validation errors that occurs in our db
const handleValidationDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
}

// Handle errors that are associated with JWT tokens
const handleJWTError = () => new AppError('Invalid token, please log in again.', 401);

const handleJWTExpiredError = () => new AppError('Token has expired, please log in again.', 401);

// Handling errors that are associated with wrong ids
const handleCastErrorDB = err => {
    const message = `invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
}

// Handling errors when there is a duplicate key in database
const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/);
    const message = `Duplicate field value: ${value[0]} - Please use another value`;

    return new AppError(message, 400);
}

// Errors that are being sent when we are in development mode
const sendErrorDev = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        })
    } else {
        return res.status(err.statusCode).render('error');
    }
}

// Errors that are being sent when we are in production mode. We send this error to the client
const sendErrorProd = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        if (err.isOperational) {
            // Trusted errors that we can send to the client. Client made this errors, invalid input, wrong route etc.
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            })
        } else {
            // Programming errors that we don't want to leak to the client
            console.error(err);
            return res.status(500).json({
                status: 'error',
                message: 'Doslo je do greske sa serverom.'
            })
        }
    }
    if (err.isOperational) {
        // Trusted errors that we can send to the client. Client made this errors, invalid input, wrong route etc.
        return res.status(err.statusCode).render('error');
    } else {
        // Programming errors that we don't want to leak to the client
        return res.status(err.statusCode).render('error');
    }
}

// Global error handler
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'
    const mode = process.env.NODE_ENV;
    if (mode === 'development') {
        sendErrorDev(err, req, res);
    } else {
        let error = { ...err };
        error.message = err.message;
        if (error.name === "CastError") error = handleCastErrorDB(error)
        if (error.code === 11000) error = handleDuplicateFieldsDB(error)
        if (error.name === "ValidationError") error = handleValidationDB(error)
        if (error.name === "JsonWebTokenError") error = handleJWTError()
        if (error.name === "TokenExpiredError") error = handleJWTExpiredError()

        sendErrorProd(error, req, res);
    }
}