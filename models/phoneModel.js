const mongoose = require('mongoose');
const slugify = require('slugify');


const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Svaki telefon mora imati naziv.'],
        unique: true
    },
    model: {
        type: String,
        required: [true, 'Svaki telefon mora imati naziv modela.'],
        unique: true
    },
    year: {
        type: String,
        required: [true, 'Svaki telefon mora imati godinu proizvodnje.']
    },
    category: {
        type: String,
        required: [true, 'Svaki telefon mora imati naziv kategorije.'],
        lowercase: true
    },
    pricePol: {
        type: String,
        required: [true, 'Svaki telefon mora imati polovnu cenu.'],
    },
    priceNov: {
        type: String,
        required: [true, 'Svaki telefon mora imati cenu novog telefona.'],
    },
    slug: {
        type: String
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

// Document middlewares 

// Before saving any document we create slug out of phone name so we can use that slug in url
phoneSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

const Phone = mongoose.model('telefoni', phoneSchema, 'telefoni');

module.exports = Phone;