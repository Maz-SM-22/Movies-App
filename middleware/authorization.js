exports.isAllowed = (req, res, next)=> {
    if(req.isAuthenticated) {
        next(); 
    }
    res.status(404).json({
        msg: 'Access denied'
    })
}