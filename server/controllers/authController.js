const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Signup controller
exports.signup = async (req, res) => {
  const { name, email, contactNumber, password, confirmPassword, termsAccepted } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      name,
      email,
      contactNumber,
      password: hashedPassword,
      termsAccepted
    });

    // Save the user to the database
    await user.save();

    // Create a JWT token (optional)
    const payload = { userId: user.id };
    const token = jwt.sign(payload, 'onestarinthesky', { expiresIn: '1h' });

    res.status(201).json({
      msg: 'User registered successfully',
      token
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
