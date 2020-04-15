const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const dbConnection = require('./db/dbConnection');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

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

app.use(setResponseHeaders);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

function setResponseHeaders(req, res, next) {
    let requestOrigin = req.headers.origin;
    res.append('Access-Control-Allow-Origin', requestOrigin);
    res.append('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    res.append('Access-Control-Allow-Credentials', 'true');
    next();
}

module.exports = app;
