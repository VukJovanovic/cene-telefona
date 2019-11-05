
// Models
const Kategorije = require('../models/categoryModel');

// Get all categories from api
exports.getAllCategories = async (req, res, next) => {
    try {
        const allCategories = await Kategorije.find();
        res.status(200).json({
            status: 'success',
            data: {
                kategorije: allCategories
            }
        });
    } catch (err) {
        next(err);
    }
};

// Get one category from api
exports.getCategory = async (req, res, next) => {
    try {
        const category = await Kategorije.find({ _id: req.params.id });
        res.status(200).json({
            status: 'success',
            data: {
                kategorija: category
            }
        });
    } catch (err) {
        next(err);
    }
}

// Creating a new category
exports.createCategory = async (req, res, next) => {
    try {
        const newCategory = await Kategorije.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                kategorija: newCategory
            }
        });
    } catch (err) {
        next(err);
    }
};

// Update category
exports.updateCategory = async (req, res, next) => {
    try {
        const filter = { _id: req.params.id }
        const category = await Kategorije.findOneAndUpdate(filter, req.body, {
            new: true,
            runValidators: true
        });

        res.status(201).json({
            status: 'success',
            data: {
                kategorija: category
            }
        });
    } catch (err) {
        next(err);
    }
}

// Delete category
exports.deleteCategory = async (req, res, next) => {
    try {
        const filter = { _id: req.params.id }
        await Kategorije.findOneAndDelete(filter);

        res.status(201).json({
            status: 'success',
            message: 'Kategorija izbrisana'
        });
    } catch (err) {
        next(err);
    }
}