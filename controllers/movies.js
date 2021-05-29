// Display all movies 
exports.getAllMovies = (req, res, next)=> {
    res.status(200).json({
        success: true,
        msg: 'Displaying all movies'
    })
}

// Display all movies by category
exports.getCategory = (req, res, next)=> {
    res.status(200).json({
        success: true,
        msg: `Displaying all ${req.params.category} movies`
    })
}

// Search for movie by title 
exports.getTitle = (req, res, next)=> {
    res.status(200).json({
        success: true,
        msg: `Displaying all search results for '${req.query}'`     // Might need to add to req.query
    })
}

// Get movie by id
exports.getById = (req, res)=> {
    res.status(200).json({
        success: true,
        msg: `Displaying movies with id ${req.params.id}`
    })
}