const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const {verifyAdmin} = require('../middleware/verifyToken');

router.put('/:id', verifyAdmin, categoryController.updateCatgory);
router.post('/', verifyAdmin, categoryController.createCategory);
router.delete('/:id', verifyAdmin, categoryController.deleteCategory);
router.post('/image/:id', verifyAdmin, categoryController.patchCategoryImage);


router.get('/', categoryController.getAllCategories);
router.get('/random', categoryController.getRandomCategories);


module.exports = router;