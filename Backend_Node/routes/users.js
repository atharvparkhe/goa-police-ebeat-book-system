const express = require('express')
const router = express.Router();

// authentication (jwt verifying) middleware
const authMiddleware = require('../middleware/authentication');
const {getAllPI,getAllConstable,getStationPI,getPersonnel,getBeatConstable} = require('../controllers/users') 

router.route('/pi').get(authMiddleware,getAllPI)
router.route('/constable').get(authMiddleware,getAllConstable)
router.route('/:id').get(authMiddleware,getPersonnel)
router.route('/station/:id').get(authMiddleware,getStationPI)
router.route('/beat/:id').get(authMiddleware,getBeatConstable)

module.exports = router