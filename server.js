const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Handling uncaught exceptions 
process.on('uncaughtException', err => {
    console.log('Uncaught exception, shutting down');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

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

const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`app running on port: ${port}`);
});

// Handling unhandled rejections 
process.on('unhandledRejection', err => {
    console.log('Unhandled rejection, shutting down');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    })
});
