const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Svaki radnik mora imati ime.'],
        minlength: [3, 'Ime se mora sastojati od najmanje 5 karaktera.'],
        maxlength: [40, 'Ime ne sme sadrzati vise od 40 karaktera.']
    },
    email: {
        type: String,
        required: [true, 'Svaki radnik mora imati svoj email.'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Unesite odgovarajuci email.']
    },
    role: {
        type: String,
        enum: ['radnik', 'admin'],
        default: 'radnik'
    },
    password: {
        type: String,
        required: [true, 'Svaki radnik mora imati svoju sifru.'],
        minlength: [6, 'Sifra se mora sastojati iz 6 ili vise karaktera.'],
        select: false
    },
    changedPasswordAt: Date
});

// Document instance methods

// Method for comparing password when user is logging in
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

// Method to check if user changed his password after a token has been sent to him
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.changedPasswordAt) {
        const changedTimestamp = parseInt(this.changedPasswordAt.getTime() / 1000);
        return JWTTimestamp < changedTimestamp
    } else {
        return false;
    }
}

// Document middleware

// Password encryption 
userSchema.pre('save', async function (next) {
    // If the password has not been changed we go to next middleware
    if (!this.isModified('password')) {
        return next();
    }

    // If password was changed or if we create new user we need to hash the password
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = mongoose.model('radnici', userSchema, 'radnici');

module.exports = User;