const AppError = require('../utils/appError');

// Models
const userModel = require('../models/userModel');

// Get all users
exports.getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await userModel.find();
        res.status(200).json({
            status: 'success',
            data: {
                radnici: allUsers
            }
        });
    } catch (err) {
        next(err);
    }
};

// Get one user based on id provided in url
exports.getUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id);

        if (!user) {
            return next(new AppError('Ne postoji korisnik sa ovim ID.', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                radnik: user
            }
        });
    } catch (err) {
        next(err);
    }
}

// Create new user
exports.createUser = async (req, res, next) => {
    try {
        const user = await userModel.create(req.body);
        res.status(200).json({
            status: 'success',
            data: {
                radnik: user
            }
        });
    } catch (err) {
        next(err);
    }
}

// Update user 
exports.updateUser = async (req, res, next) => {
    try {
        const radnik = await userModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!radnik) {
            return next(new AppError('Ne postoji korisnik sa ovim ID.', 404));
        }

        res.status(201).json({
            status: 'success',
            data: {
                radnik
            }
        });
    } catch (err) {
        next(err);
    }
}

// Delete user
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);

        if (!user) {
            return next(new AppError('Ne postoji korisnik sa ovim ID.', 404));
        }

        res.status(201).json({
            status: 'success',
            message: 'Telefon izbrisan'
        });
    } catch (err) {
        next(err);
    }
}