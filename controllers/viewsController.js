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
    next(err);
  }
};

// Render phones from search
exports.getSearch = async (req, res, next) => {
  try {
    let search = req.query.search.toLowerCase();
    let searchArray = search.split(' ');

    const sortFilter = {
      year: -1,
      month: -1
    };

    const regularExp = niz => {
      let regExp = '';
      let count = 0;
      niz.forEach(el => {
        if (count < niz.length - 1) {
          regExp += `(${el}).*`;
          count = count + 1;
        } else if (count === niz.length - 1) {
          regExp += `(${el})`;
        }
      });
      const reg = new RegExp(regExp, 'g');
      return reg;
    };

    let reg = regularExp(searchArray);

    const phones = await phoneModel
      .find({ model: { $regex: reg } })
      .sort(sortFilter);
    if (phones.length > 0) {
      let upperHeading;
      if (phones[0].category === 'iphone') {
        upperHeading = phones[0].category.capitalize('iphone');
      } else {
        upperHeading = phones[0].category.capitalize('all');
      }
      return res.status(200).render('phones', {
        title: upperHeading,
        phones
      });
    } else {
      return res.status(200).render('notFound', {
        title: 'Telefon nije pronadjen! Pokusajte ponovo.'
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

String.prototype.capitalize = function(category) {
  if (category === 'iphone') {
    return this.charAt(0) + this.charAt(1).toUpperCase() + this.slice(2);
  } else if (category === 'all') {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }
};

// Render category page and display data on it
exports.getPhonesByCategory = async (req, res, next) => {
  try {
    const filter = req.params.slug;
    const sortFilter = {
      year: -1,
      month: -1
    };
    const phones = await phoneModel.find({ category: filter }).sort(sortFilter);
    if (phones.length > 0) {
      let upperHeading;
      if (phones[0].category === 'iphone') {
        upperHeading = phones[0].category.capitalize('iphone');
      } else {
        upperHeading = phones[0].category.capitalize('all');
      }
      return res.status(200).render('phones', {
        title: upperHeading,
        phones
      });
    } else {
      return res.status(200).render('notFound', {
        title: 'Trenutno nemamo telefone u ovoj kategoriji.'
      });
    }
  } catch (err) {
    next(new AppError('Trenutno nemamo telefone u ovoj kategoriji', 404));
  }
};

// Render login page
exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Ulogujte se na vas nalog'
  });
};

// Render admin panel
exports.getAdminPanel = (req, res) => {
  res.status(200).render('adminPanel', {
    title: 'Admin panel'
  });
};
