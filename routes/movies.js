const express = require('express'); 
const movieController = require('../controllers/movies'); 
const router = express.Router(); 

router.get('/categories/:category', movieController.getCategory); 
router.get('/search', movieController.searchByTitle); 
router.get('/:id', movieController.getById); 
router.get('/', movieController.getAllMovies); 

module.exports = router; 

// req.query.title