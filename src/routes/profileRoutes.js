const express = require('express');
const auth = require('../middleware/auth');
const { 
  createOrUpdateMentorProfile, 
  createOrUpdateMenteeProfile,
  getCurrentUserProfile 
} = require('../controllers/profileController');
const router = express.Router();

// Create or update mentor profile
router.post('/mentor', auth, createOrUpdateMentorProfile);

// Create or update mentee profile
router.post('/mentee', auth, createOrUpdateMenteeProfile);

// Get current user's profile
router.get('/me', auth, getCurrentUserProfile);

module.exports = router;
