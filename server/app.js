require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/routes');
const mongoose = require('mongoose');
const User = require('./models/user');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const user = require('./models/user');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: "Manali",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

mongoose.connect(process.env.MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

passport.use(User.createStrategy());
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
}, async ( accessToken, refreshToken, profile, done) => {
    await User.findOne({
        email: profile.id
    }, (err, user) => {
        if(err)
            return done(err, user);
        else if (!user) {
            const newUser = new User({
                email: profile.id,
                name: profile.name.givenName,
                accessToken: accessToken,
                refreshToken: refreshToken
            });
            newUser.save(function (err) {
                done(err, user);
            });
        }
        else {
            if (!user.refreshToken || user.refreshToken == null) {
                user.refreshToken=refreshToken
            }
            user.accessToken = accessToken;
            user.name = profile.name.givenName;
            user.save(function (err, anotherUser) {
                done(err, anotherUser);
            });
        }
    });
}));


app.use('/', indexRouter);

module.exports = app;