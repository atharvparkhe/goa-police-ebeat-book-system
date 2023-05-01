const express = require('express')
const router = express.Router();

const {register,login,load} = require('../controllers/auth');
const authMiddleware = require('../middleware/authentication');

router.route('/login').post(login);
router.route('/register').post(register)
router.route('/load').get(authMiddleware,load)

module.exports = router;