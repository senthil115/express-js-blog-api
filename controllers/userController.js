const User = require('../models/user');
const config = require('../config');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });
    await user.save();
    res.status(201).send('User created');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(401).send('Invalid email or password');
    }
    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET);
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};