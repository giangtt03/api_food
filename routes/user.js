const router = require('express').Router();
const userController = require('../controllers/userController');
const {verifyToken, verifyAndAuthorization, verifyVendor, verifyDriver, verifyAdmin} = require('../middleware/verifyToken')

router.get('/', verifyAndAuthorization, userController.getUser);
router.delete('/', verifyAndAuthorization, userController.deleteUser);
router.put('/', verifyAndAuthorization, userController.updateUser);

module.exports = router;