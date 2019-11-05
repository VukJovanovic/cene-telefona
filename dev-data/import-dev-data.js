const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// Models
const CategoryModel = require('../models/categoryModel');
const phoneModel = require('../models/phoneModel');
const userModel = require('../models/userModel');

// Replacing string password with a real one in config.eng
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// Connecting to our database
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connection successful!');
});


const kategorije = JSON.parse(fs.readFileSync(`${__dirname}/kategorije.json`, 'utf-8'));
const telefoni = JSON.parse(fs.readFileSync(`${__dirname}/telefoni.json`, 'utf-8'));
const radnici = JSON.parse(fs.readFileSync(`${__dirname}/radnici.json`, 'utf-8'));

// Importing data into database
const importData = async () => {
    try {
        await CategoryModel.create(kategorije);
        await phoneModel.create(telefoni);
        await userModel.create(radnici);
        console.log('Uspesno ubacivanje u bazu.');
        process.exit();
    } catch (err) {
        console.log(err)
    }
}

// Deleting existing data from the database
const deleteData = async () => {
    try {
        await CategoryModel.deleteMany();
        await phoneModel.deleteMany();
        await userModel.deleteMany();
        console.log('Uspesno brisanje iz baze.');
        process.exit();
    } catch (err) {
        console.log(err)
    }
}

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}