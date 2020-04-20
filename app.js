const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const dbConnection = require('./db/dbConnection');
const errorHandler = require('./functions/errorHandler');
const mError = require('./constants/Errors');
const modifier = require('./functions/responseModifier');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const adminRouter = require('./routes/admin');
const deviceRouter = require('./routes/device');

const SessionStore = require('connect-mongo')(session);

const app = express();

// settings setup
app.disable('x-powered-by');
app.enable('trust proxy');

//client session setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
        secure: (process.env.SECURE_COOKIE === "true"),
        sameSite: process.env.SAME_SITE,
        httpOnly: true
    },
    store: new SessionStore({
        url: process.env.DATABASE_CONNECTION_STRING
    })
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(modifier.setResponseHeaders);

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/admin', adminRouter);
app.use('/device', deviceRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404, mError.NOT_FOUND));
});

// error handler
app.use(errorHandler.errorRouteHandler);

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
