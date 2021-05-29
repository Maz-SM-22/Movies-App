const express = require('express'); 
const userController = require('../controllers/users'); 
const router = express.Router();

router.get('/favorites', userController.getFavourites);
router.post('/favorites', userController.addFavourite);
router.delete('/favorites/:id', userController.deleteFromFavourites);

module.exports = router; 