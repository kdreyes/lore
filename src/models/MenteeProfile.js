const mongoose = require('mongoose');

const MenteeProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bio: String,
  currentJobTitle: String,
  desiredJobTitle: String,
  shortTermGoals: [String],
  longTermGoals: [String],
  learningPreferences: [String],
  areasSeekingGuidance: [String],
  currentSkills: [String],
  skillsToDevelop: [String],
  education: String,
  certifications: [String],
  interests: [String],
}, { timestamps: true });

module.exports = mongoose.model('MenteeProfile', MenteeProfileSchema);
