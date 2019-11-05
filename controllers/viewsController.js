const categoryModel = require('../models/categoryModel');
const phoneModel = require('../models/phoneModel');
const AppError = require('../utils/appError');

// Render overview page / homepage and display data
exports.getOverview = async (req, res, next) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).render('base', {
            categories
        });
    } catch (err) {
        next(err)
    }
}

// Render category page and display data on it
exports.getPhonesByCategory = async (req, res, next) => {
    try {
        filter = req.params.slug;
        const phones = await phoneModel.find({ category: filter });
        res.status(200).render('phones', {
            title: phones[0].category,
            phones
        });
    }
    catch (err) {
        next(err)
    }
}

// Render login page
exports.getLoginForm = (req, res) => {
    res.status(200).render('login', {
        title: "Ulogujte se na vas nalog"
    });
}

// Render admin panel
exports.getAdminPanel = (req, res) => {
    res.status(200).render('adminPanel', {
        title: "Admin panel"
    });
}