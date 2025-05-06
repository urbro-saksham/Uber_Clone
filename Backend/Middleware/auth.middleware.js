const model = require('../Models/user');
const jwt = require('jsonwebtoken');
const blacklistTokenSchema = require('../Models/blacklist.Token');
const captainModel = require('../Models/captain.model');

module.exports.authUser = async (req, res, next) => {
  try {

    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Token missing' });
    }

    const blackLIST = await blacklistTokenSchema.findOne({ token });

    if(blackLIST) {
      return res.status(401).json({ message: 'Unauthorized - Token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await model.findById(decoded.id || decoded._id); // adjust key based on your token payload

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized - User not found' });
    }

    req.user = user;
    next();

  } catch (error) {
    console.error('Auth error:', error.message);
    if (!res.headersSent) {
      return res.status(401).json({ message: 'Unauthorized - Invalid or expired token' });
    }
  }
};

module.exports.authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];


  if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
  }

  const isBlacklisted = await blacklistTokenSchema.findOne({ token: token });



  if (isBlacklisted) {
      return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const captain = await captainModel.findById(decoded._id)
      req.captain = captain;

      return next();
      
  } catch (err) {
      console.log(err);

      res.status(401).json({ message: 'Unauthorized' });
  }
}