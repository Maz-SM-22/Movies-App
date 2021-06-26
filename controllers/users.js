const User = require('../models/user'); 

// Display all favourite movies
exports.getFavourites = (req, res, next)=> {
    // Some logic to fetch user's faves from database and display them 
}

// Add movie to my favourites 
exports.addFavourite = (req, res)=> {
    userFavourites.push(req.body.whatever); 
    // Or something 
}

// Delete movie from favourite
exports.deleteFromFavourites = (req, res)=> {
    // presuming that the favourites are stored in some kind of array 
    // Maybe use a filter function 
    userFavourites.filter((movie)=> {
        movie.id !== req.params.id; 
    })
}