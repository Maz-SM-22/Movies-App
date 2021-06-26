const Movie = require('../models/movie'); 

exports.getAllMovies = (req, res, next)=> {
    Movie.find({}, (err, docs)=> {
        if(!docs) {
            res.status(404).json({
                success: false, 
                msg: "Whoops! Looks like there's nothing to see here 😨", 
            })
            return; 
        }
        res.status(200).json({
            success: true, 
            msg: "Displaying all movies",
            movies: docs
        })
    }); 
}

exports.getCategory = (req, res, next)=> {
    Movie.find({ category: req.params.category }, (err, docs)=> {
        if (!docs) {
            res.status(404).json({
                success: false, 
                msg: "Whoops! Looks like there are no movies for this category 🎞"
            })
        }
        res.status(200).json({
            success: true, 
            msg: `Displaying all search results for '${req.params.category}'`,
            movies: docs
        })
    })
}

exports.searchByTitle = (req, res, next)=> {
    Movie.find({ $text: { $search: req.query.title }}, (err, docs)=> { 
        if (!docs) {
            res.status(404).json({
                success: false, 
                msg: "Whoops! Looks like there are no movies with this title 🤔"
            })
            return; 
        }
        res.status(200).json({
            success: true, 
            msg: `Displaying all search results for '${req.query.title}'`,
            movies: docs
        })
    })
}

exports.getById = (req, res, next)=> {
    Movie.findById(req.params.id, (err, doc)=> {
        if(!doc) {
            res.status(404).json({
                success: false,
                msg: `No movie found with id '${req.params.id}'`, 
            })
            return; 
        }
        res.status(200).json({
            success: true,
            msg: `Displaying movie with id '${req.params.id}'`, 
            movie: doc
        })
    })
}