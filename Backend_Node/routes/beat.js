const express = require('express')
const router = express.Router();

// authentication (jwt verifying) middleware
const authMiddleware = require('../middleware/authentication');
const {addBeat,getBeat,updateBeat,deleteBeat,assignBeatOfficer,allBeats} = require('../controllers/beat') 

router.route('/').post(authMiddleware,addBeat).get(authMiddleware,allBeats)
router.route('/:id').get(authMiddleware,getBeat).patch(authMiddleware,updateBeat).delete(authMiddleware,deleteBeat)
router.route('/assign-officer/:id').post(authMiddleware,assignBeatOfficer)

module.exports = router