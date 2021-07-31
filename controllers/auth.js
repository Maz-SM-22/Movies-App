const User = require('../models/user');
const passport = require('passport');
require('../config/passport');

exports.register = (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, doc) => {
        if (doc) {
            return res.status(400).send({
                message: `Email <${req.body.email}> already taken`
            });
        } else {
            let user = new User(req.body);
            user.generateHashPassword(req.body.password)
            user.save((err) => {
                if (err) {
                    next(err);
                } else {
                    req.login(user, (err) => {
                        if (err) {
                            next(err);
                        }
                        res.status(200).json({
                            email: user.email,
                            username: user.username
                        });
                    })
                }
            });
        }
    });
}

exports.login = (req, res, next) => {
    passport.authenticate('local', function (err, user) {
        if (err || !user) {
            res.status(401).send('Unauthorized')
        } else {
            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                res.status(200).json({
                    email: user.email,
                    username: user.username
                })
            })
        }
    })(req, res, next);
};

exports.getUser = (req, res) => {
    res.status(200);
    if (!req.isAuthenticated()) {
        res.send({});
    } else {
        res.json({
            email: req.user.email,
            username: req.user.username
        })
    }
}

exports.logout = (req, res) => {
    req.logout();
    res.status(200).send();
}