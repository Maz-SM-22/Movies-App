const User = require('../models/user'); 
const passport = require('passport');
require('../config/passport');  

exports.register = (req, res, next)=> {
    // Check if user already exists and if it does raise error. If it doesn't create new user. 
    User.findOne({email: req.body.email}, (err, doc)=> {
        if(doc) {
            // throw new Error('This user already exists!'); 
            console.log('It looks like this user already exists!'); 
        } else {
            let user = new User(req.body); 
            user.generateHashPassword(req.body.password)
            user.save((err)=> {
                if(err) {
                    next(err); 
                } else {
                    req.login(user, (err)=> {
                        if(err) {
                            next(err); 
                        } 
                        res.redirect('/user/favourites'); 
                    }) 
                }
            }); 
        }
    });  
}

exports.login = (req, res, next)=> {
    passport.authenticate('local', {
        successRedirect: '/user/favourites', 
        failureRedirect: 'choose an endpoint'
    }) (req, res, next)
}

exports.logout = (req, res, next)=> {
    req.logout(); 
    res.redirect('Choose an endpoint'); 
}