const express = require('express')
const router = express.Router();

// authentication (jwt verifying) middleware
const authMiddleware = require('../middleware/authentication');

const {createSubdivision,getAllSubDivisions,
    getSubDivision,updateSubdivision,deleteSubdivision} = require('../controllers/subdivision');

router.route('/').post(authMiddleware,createSubdivision).get(authMiddleware,getAllSubDivisions)
router.route('/:id').get(authMiddleware,getSubDivision).patch(authMiddleware,updateSubdivision).delete(authMiddleware,deleteSubdivision)

module.exports = router