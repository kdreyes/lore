const MentorProfile = require('../models/MentorProfile');
const MenteeProfile = require('../models/MenteeProfile');

const calculateMatchScore = (mentor, mentee) => {
  let score = 0;

  // Matching skills
  const commonSkills = mentor.areasOfExpertise.filter(skill => mentee.skillsToDevelop.includes(skill));
  score += commonSkills.length * 10;

  // Matching interests
  const commonInterests = mentor.mentoringPreferences.filter(preference => mentee.learningPreferences.includes(preference));
  score += commonInterests.length * 5;

  // Matching goals
  if (mentor.achievements.includes(mentee.shortTermGoals) || mentor.achievements.includes(mentee.longTermGoals)) {
    score += 20;
  }

  // Matching availability
  if (mentor.availability === mentee.availability) {
    score += 10;
  }

  // Matching location
  if (mentor.location && mentee.location && mentor.location === mentee.location) {
    score += 5;
  }

  return score;
};

const findMatchesForMentee = async (menteeId) => {
  const menteeProfile = await MenteeProfile.findOne({ user: menteeId });
  const mentors = await MentorProfile.find();

  const matches = mentors.map(mentor => {
    const score = calculateMatchScore(mentor, menteeProfile);
    return { mentor, score };
  });

  matches.sort((a, b) => b.score - a.score); // Sort by score descending

  return matches;
};

module.exports = { findMatchesForMentee };
