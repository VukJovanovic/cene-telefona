const path = require('path');
const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const errorController = require('./controllers/errorController');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');

// Routers 
const categoryRouter = require('./routes/categoryRoutes');
const phoneRouter = require('./routes/phoneRoutes');
const userRouter = require('./routes/userRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security http headers
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Limit requests from same ip
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour.'
});
app.use('/api', limiter)

// Body parser, reading data from body into req.body
app.use(express.json({
    limit: '10kb'
}));
app.use(cookieParser());

// Data sanitization against noSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution 
app.use(hpp());

app.use(compression());

// Routes
app.use('/', viewRouter);
app.use('/api/v1/kategorije', categoryRouter);
app.use('/api/v1/telefoni', phoneRouter);
app.use('/api/v1/radnici', userRouter);

// Handle all unhandled routes
app.all('*', (req, res, next) => {
    next(new AppError(`Ne postoji stranica na ovoj adresi: ${req.originalUrl}`, 404));
});

// Error handling 
app.use(errorController);

module.exports = app;