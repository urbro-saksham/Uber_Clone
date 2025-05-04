const userModel = require('../Models/user');
const userService = require('../Services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenSchema = require('../Models/blacklist.Token');

module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    if (!fullname || !fullname.firstname || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const normalizedEmail = email.toLowerCase();

    const isAlreadyExists = await userModel.findOne({ email: normalizedEmail });

    if (isAlreadyExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
      fullname,
      email: normalizedEmail,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    return res.status(200).json({ token, user });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports.getUserProfile = async (req, res, next) => {
   res.status(200).json(req.user);
};

module.exports.logout = async (req, res, next) => {
  res.clearCookie('token');
  const token = req.cookie.token || res.headers.authorization?.split(' ')[1];

  await blacklistTokenSchema.create({ token });

  res.status(200).json({message: 'Logout'});
}