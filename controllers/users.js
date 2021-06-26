const User = require('../models/user'); 
const Movie = require('../models/movie'); 

exports.getFavourites = (req, res, next)=> {
    User.findOne({_id: req.user._id}).populate('favourites').then(user => res.status(200).json({
        success: true,
        msg: `Displaying favourites for user with id: ${req.user._id}`, 
        favorites: user.favorites
    })).catch(error => next(error));
}

exports.addFavourite = (req, res, next)=> {
    let user = User.findOne({ _id: req.user._id }).exec(); 
    Movie.findById(req.body._id, (err, doc)=> {
        if(!doc) {
            res.status(404).json({
                success: false, 
                msg: "Uhoh! Unable to find that movie 👀", 
            })
            return; 
        }
        user.favourites.push(doc); 
        res.status(200).json({
            success: true, 
            msg: `Successfully added movie to your favourites`, 
            movie: doc, 
            favourites: user.favourites
        })
    })
}

exports.deleteFromFavourites = (req, res, next)=> {
    let user = User.findOne({ _id: req.user._id }).exec(); 
    Movie.findById(req.params.id, (err, doc)=> {
        if(!doc) {
            res.status(404).json({
                success: false, 
                msg: "Uhoh! Unable to find that movie 👀", 
            })
            return; 
        }
        user.favourites.pull({ _id: doc._id })
        res.status(200).json({
            success: true, 
            msg: `Successfully removed from your favourites`, 
            movie: doc, 
            favourites: user.favourites
        })
    })
}