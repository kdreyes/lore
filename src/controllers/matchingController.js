const { findMatchesForMentee } = require('../utils/matchingAlgorithm');

// Get matches for a mentee
exports.getMatchesForMentee = async (req, res) => {
  try {
    const matches = await findMatchesForMentee(req.user.id);
    res.json(matches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
