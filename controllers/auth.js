const User = require('../models/user'); 
const passport = require('passport');
require('../config/passport');  

exports.register = (req, res, next)=> {
    User.findOne({email: req.body.email}, (err, doc)=> {
        if(doc) { 
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
    })
}

exports.logout = (req, res, next)=> {
    req.logout(); 
    res.redirect('Choose an endpoint'); 
}