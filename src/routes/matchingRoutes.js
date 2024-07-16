const express = require('express');
const auth = require('../middleware/auth');
const { getMatchesForMentee } = require('../controllers/matchingController');
const router = express.Router();

// Get matches for a mentee
router.get('/matches', auth, getMatchesForMentee);

module.exports = router;
