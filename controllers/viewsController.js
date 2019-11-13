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

String.prototype.capitalize = function(category) {
    if(category === 'iphone'){
        return this.charAt(0) + this.charAt(1).toUpperCase() + this.slice(2);
    } else if( category === 'all'){
        return  this.charAt(0).toUpperCase() + this.slice(1);
    }
    
}

// Render category page and display data on it
exports.getPhonesByCategory = async (req, res, next) => {
    try {
        const filter = req.params.slug;
        const sortFilter = {
            year: -1,
            month: -1
        }
        const phones = await phoneModel.find({ category: filter }).sort(sortFilter);
        let upperHeading;
        if(phones[0].category === "iphone"){
            upperHeading = phones[0].category.capitalize('iphone');
        } else{
            upperHeading = phones[0].category.capitalize('all');
        }
        res.status(200).render('phones', {
            title: upperHeading,
            phones
        });
        if (!phones) {
            return next(new AppError('Trenutno nemamo telefone u ovoj kategoriji', 404));
        }
    }
    catch (err) {
        next(new AppError('Trenutno nemamo telefone u ovoj kategoriji', 404));
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