const MentorProfile = require('../models/MentorProfile');
const MenteeProfile = require('../models/MenteeProfile');

// Create or update mentor profile
exports.createOrUpdateMentorProfile = async (req, res) => {
  const {
    bio, jobTitle, company, yearsOfExperience, areasOfExpertise,
    availability, mentoringPreferences, linkedinProfile, achievements,
    certifications
  } = req.body;

  const profileFields = {
    user: req.user.id,
    bio, jobTitle, company, yearsOfExperience, areasOfExpertise,
    availability, mentoringPreferences, linkedinProfile, achievements,
    certifications
  };

  try {
    let profile = await MentorProfile.findOne({ user: req.user.id });
    if (profile) {
      console.log('Updating existing mentor profile for user:', req.user.id);
      profile = await MentorProfile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    console.log('Creating new mentor profile for user:', req.user.id);
    profile = new MentorProfile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Create or update mentee profile
exports.createOrUpdateMenteeProfile = async (req, res) => {
  const {
    bio, currentJobTitle, desiredJobTitle, shortTermGoals, longTermGoals,
    learningPreferences, areasSeekingGuidance, currentSkills, skillsToDevelop,
    education, certifications, interests
  } = req.body;

  const profileFields = {
    user: req.user.id,
    bio, currentJobTitle, desiredJobTitle, shortTermGoals, longTermGoals,
    learningPreferences, areasSeekingGuidance, currentSkills, skillsToDevelop,
    education, certifications, interests
  };

  try {
    let profile = await MenteeProfile.findOne({ user: req.user.id });
    if (profile) {
      console.log('Updating existing mentee profile for user:', req.user.id);
      profile = await MenteeProfile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    console.log('Creating new mentee profile for user:', req.user.id);
    profile = new MenteeProfile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get current user's profile
exports.getCurrentUserProfile = async (req, res) => {
  try {
    console.log('Fetching profile for user:', req.user);
    let profile;
    if (req.user.role === 'mentor') {
      profile = await MentorProfile.findOne({ user: req.user.id }).populate('user', ['name', 'email']);
    } else if (req.user.role === 'mentee') {
      profile = await MenteeProfile.findOne({ user: req.user.id }).populate('user', ['name', 'email']);
    }
    if (!profile) {
      console.log('Profile not found for user:', req.user.id);
      return res.status(400).json({ msg: 'Profile not found' });
    }
    console.log('Profile found:', profile);
    res.json(profile);
  } catch (err) {
    console.error('Error fetching profile:', err.message);
    res.status(500).send('Server error');
  }
};
