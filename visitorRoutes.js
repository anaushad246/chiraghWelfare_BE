const express = require('express');
const { incrementVisitorCount } = require('./src/controllers/controllers.js');


const router = express.Router();

// router.get('show-visitor', )
router.post('/increment-visitor', incrementVisitorCount);

module.exports = router;