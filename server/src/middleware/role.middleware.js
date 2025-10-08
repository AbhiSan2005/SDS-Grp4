const restrictTo = (...roles) => {
  return (req, res, next) => {
    // Checked if user exists
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }

    // Checked if user role is in allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action'
      });
    }

    next();
  };
};

const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
  }
  next();
};

const facultyOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'faculty') {
    return res.status(403).json({
      success: false,
      message: 'Faculty access required'
    });
  }
  next();
};

module.exports = {
  restrictTo,
  adminOnly,
  facultyOnly
};