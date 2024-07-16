const mongoose = require('mongoose');

const MentorProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bio: String,
  jobTitle: String,
  company: String,
  yearsOfExperience: Number,
  areasOfExpertise: [String],
  availability: String,
  mentoringPreferences: [String],
  linkedinProfile: String,
  achievements: [String],
  certifications: [String],
}, { timestamps: true });

module.exports = mongoose.model('MentorProfile', MentorProfileSchema);
