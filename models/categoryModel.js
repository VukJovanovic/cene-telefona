const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Kategorija mora imati ime.'],
        unique: true,
        trim: true
    },
    slug: {
        type: String,
    }
});

// Before saving any document we create slug out of phone name so we can use that slug in url
categorySchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

const Category = mongoose.model('kategorije', categorySchema, 'kategorije');

module.exports = Category;