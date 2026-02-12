const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AppError = require('../utils/AppError');

const protect = async (req, res, next) => {
  let token;

  // 1. Check for token in cookies or Authorization header
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  // 2. Verify token
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return next(new AppError('Invalid token. Please log in again.', 401));
    }

    // 3. Check if user still exists
    const currentUser = await User.findUserById(decoded.id);
    if (!currentUser) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }

    // 4. Check if user changed password after the token was issued
    if (currentUser.password_changed_at) {
      const changedTimestamp = parseInt(new Date(currentUser.password_changed_at).getTime() / 1000, 10);
      if (decoded.iat < changedTimestamp) {
        return next(new AppError('User recently changed password! Please log in again.', 401));
      }
    }
    
    // 5. Check if user is active (Soft Delete Check)
    if (!currentUser.is_active) {
        return next(new AppError('This user account has been deactivated.', 401));
    }

    // Grant access
    req.user = currentUser;
    next();
  });
};

module.exports = protect;