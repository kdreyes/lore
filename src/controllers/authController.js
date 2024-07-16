const User = require('../models/User');
const MentorProfile = require('../models/MentorProfile');
const MenteeProfile = require('../models/MenteeProfile');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      role,
    });

    console.log('Original password:', password);

    await user.save();

    console.log('Hashed password:', user.password);

    // Create profile based on user role
    if (role === 'mentor') {
      console.log('Creating mentor profile during registration for user:', user.id); // Add log
      const profileFields = { user: user.id };
      const profile = new MentorProfile(profileFields);
      await profile.save();
    } else if (role === 'mentee') {
      console.log('Creating mentee profile during registration for user:', user.id); // Add log
      const profileFields = { user: user.id };
      const profile = new MenteeProfile(profileFields);
      await profile.save();
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Error during registration:', err.message);
    res.status(500).send('Server error');
  }
};

// Login a user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    console.log('User found:', user);
    console.log('Entered password:', password); // Add log
    console.log('Stored hashed password:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password comparison result:', isMatch);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).send('Server error');
  }
};
