const User = require("../models/user.model")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'User already exists' });
  
      const user = new User({ name, email, password, role });
      await user.save();
      res.status(201).json({user, message: 'User registered successfully' });
    } catch (err) {
      console.error("Registration Error:", err.message); // Log the error
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
  
      res.status(200).json({user, token });
    } catch (err) {
      console.error("Login Error:", err.message); // Log the error
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  