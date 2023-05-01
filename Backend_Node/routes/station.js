const express = require('express')
const router = express.Router();

// authentication (jwt verifying) middleware
const authMiddleware = require('../middleware/authentication');
const {addStation,deleteStation,updateStation,getStations,getStation,assignInspector} = require('../controllers/station') 

router.route('/').post(authMiddleware,addStation).get(authMiddleware,getStations)
router.route('/:id').delete(authMiddleware,deleteStation).patch(authMiddleware,updateStation).get(authMiddleware,getStation)
router.route('/assign-pi/:id').post(authMiddleware,assignInspector)

module.exports = router