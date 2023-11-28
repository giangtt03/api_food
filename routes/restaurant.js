const router = require('express').Router();
const restaurantController = require('../controllers/restaurantController');
const {verifyToken, verifyAndAuthorization, verifyVendor, verifyDriver, verifyAdmin} = require('../middleware/verifyToken')

router.post('/', restaurantController.addRestaurant);
router.get('/byId/:id', restaurantController.getRestaurant);
router.get('/:code', verifyAndAuthorization, restaurantController.getRandomRestaurants);

router.delete('/:id', verifyVendor, restaurantController.deleteRestaurant);
router.patch('/:id', verifyVendor, restaurantController.serviceAvaibility);

module.exports = router;