const router = require('express').Router();
const foodController = require('../controllers/foodController');
const {verifyVendor} = require('../middleware/verifyToken');

router.post('/',  foodController.addFood);
router.post('/tags/:id',  foodController.addFoodTag);

router.post('/type/:id',  foodController.addFoodType);
router.get('/type/:id',  foodController.getFoodById);

router.get('/:category/:code',  foodController.getRandomBycategoryAndCode);
router.delete('/:id', verifyVendor, foodController.deleteFoodById);
router.patch('/restaurant/:restaurantId', verifyVendor, foodController.getFoodByRestaurant);
router.patch('/restaurant/:restaurantId',  foodController.getFoodByRestaurant);




module.exports = router;