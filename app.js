const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const router = express.Router();
const morgan = require('morgan');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const cors = require('cors');
require('./config/passport');
const dbConnect = require('./config/dbConfig');
const app = express();

dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 2295;
const mongoStore = MongoStore.create({
    mongoUrl: process.env.LOCAL_MONGODB_URL,
    collection: 'sessions'
});

app.set('trust proxy', 1);
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: mongoStore,
    cookie: {
        httpOnly: true,
        maxAge: 86400000,
        sameSite: "none",
        secure: process.env.NODE_ENV !== 'moviesApp'
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

dbConnect();

app.use(express.json());

if (process.env.NODE_ENV === 'moviesApp') {
    app.use(morgan('dev'));
}

const routeAuth = require('./routes/auth');
const routeUsers = require('./routes/users');
const routeMovies = require('./routes/movies');

app.use('/auth', routeAuth);
app.use('/user', routeUsers);
app.use('/', routeMovies);

app.use(() => {
    let error = new Error('Page was not found.');
    error.statusCode = 404;
})

app.listen(PORT, () => {
    console.log(`Server active at http://localhost:${PORT}`);
})