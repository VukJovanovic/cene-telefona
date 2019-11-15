const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

// creating token 
const signToken = id => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);

    res.cookie('jwt', token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });

    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
}

// login user
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if both email and password are defined
        if (!email || !password) {
            return next(new AppError('Molimo vas popunite oba polja.', 400));
        }

        // Check if user exists in the database and check if the password is correct
        const user = await User.findOne({ email }).select('+password');

        if (!user || !await user.correctPassword(password, user.password)) {
            return next(new AppError('Pogresili ste email ili sifru', 401));
        }

        // If everything is ok, sign the token and login the user
        const token = createSendToken(user, 200, req, res);

    } catch (err) {
        next(err);
    }
}

// Logout user
exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    res.status(200).json({ status: 'success' });
}

// Protecting routes. Checking if user's token is valid and if he can login 
exports.protect = async (req, res, next) => {
    try {
        // Get token from headers and check if it is there
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        // If token does not exists we cannot let user go on that route
        if (!token) {
            return next(new AppError('You are not logged in, please log in to get access', 401));
        }

        // Verification token. check if token is valid and is not changed
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // Check if user that token belongs still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return next(new AppError('The user belonging to this token does not longer exists', 401));
        }

        // Check if user changed his password after the token was issued
        if (currentUser.changedPasswordAfter(decoded.iat)) {
            return next(new AppError('User recently changed his password, please log in again.', 401));
        }

        req.user = currentUser;
        next();
    } catch (err) {
        next(err);
    }
}

// With this function we restrict access to specific routes based on user role
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action.', 403));
        }
        next();
    }
}

// For rendered pages
exports.isLoggedIn = async (req, res, next) => {
    try {
        // Get token from headers and check if it is there
        if (req.cookies.jwt) {

            // Verification token. check if token is valid and is not changed
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

            // Check if user that token belongs still exists
            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                return next();
            }

            // Check if user changed his password after the token was issued
            if (currentUser.changedPasswordAfter(decoded.iat)) {
                return next();
            }

            res.locals.user = currentUser;
            req.user = currentUser;
            return next();
        }
        next();
    } catch (err) {
        next(err);
    }
}