const express = require('express')
const router = express.Router();

// authentication (jwt verifying) middleware
const authMiddleware = require('../middleware/authentication');
const {addStation,deleteStation,updateStation,getStations,
    getStation,assignInspector,getMyStation} = require('../controllers/station') 

router.route('/').post(authMiddleware,addStation).get(authMiddleware,getStations)
router.route('/:id').delete(authMiddleware,deleteStation).patch(authMiddleware,updateStation).get(authMiddleware,getStation)
router.route('/assign-pi/:id').post(authMiddleware,assignInspector)
router.route('/pi').post(authMiddleware,getMyStation)

module.exports = router