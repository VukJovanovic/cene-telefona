const AppError = require('../utils/appError');

// Models
const PhoneModel = require('../models/phoneModel');

// Get phone based on its id
exports.getPhone = async (req, res, next) => {
    try {
        const telefon = await PhoneModel.find({ slug: req.params.slug });

        if (!telefon) {
            return next(new AppError('Ne postoji telefon sa ovim ID.', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                telefon
            }
        })
    } catch (err) {
        next(err);
    }
};

// Get all phones that have same category as category in url parameter
exports.getCategoryPhones = async (req, res, next) => {
    try {
        const telefoni = await PhoneModel.find({ category: req.params.category });

        if (telefoni.length === 0) {
            return next(new AppError('Nazalost za sada nemamo telefone u ovoj kategoriji.', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                telefoni
            }
        })
    } catch (err) {
        next(err);
    }
};

// Get all phones
exports.getAllTelephones = async (req, res, next) => {
    try {
        const telefoni = await PhoneModel.find();
        res.status(200).json({
            status: "success",
            data: {
                telefoni
            }
        })
    } catch (err) {
        next(err);
    }
};

// Create new phone
exports.createPhone = async (req, res, next) => {
    try {
        const telefon = await PhoneModel.create(req.body);
        res.status(200).json({
            status: "success",
            data: {
                telefon
            }
        })
    } catch (err) {
        next(err);
    }
};

// Update phone
exports.updatePhone = async (req, res, next) => {
    try {
        const telefon = await PhoneModel.findOneAndUpdate({ slug: req.params.slug }, req.body, {
            new: true,
            runValidators: true
        });

        if (!telefon) {
            return next(new AppError('Ne postoji telefon sa ovim ID.', 404));
        }

        res.status(201).json({
            status: 'success',
            data: {
                telefon
            }
        });
    } catch (err) {
        next(err);
    }
}

// Delete phone
exports.deletePhone = async (req, res, next) => {
    try {
        const telefon = await PhoneModel.findByIdAndDelete(req.params.id);

        if (!telefon) {
            return next(new AppError('Ne postoji telefon sa ovim ID.', 404));
        }

        res.status(201).json({
            status: 'success',
            message: 'Telefon izbrisan'
        });
    } catch (err) {
        next(err);
    }
}