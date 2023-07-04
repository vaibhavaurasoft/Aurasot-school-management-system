const TryCatch = require("./TryCatch");
const jwt = require("jsonwebtoken");
const User = require("../model/User/User");

// Middleware to check if the user is authenticated
const isAuthenticateUser = TryCatch(async (req, res, next) => {
  const { token } = req.cookies;

  // Check if token exists
  if (!token) {
    return res
      .status(404) 
      .json({ failed: "Please login to access this facility" });
  }

  // Verify and decode token
  const decodeData = jwt.verify(token, process.env.JWT_SECRET);

  // Find user based on decoded data
  req.user = await User.findById(decodeData.id);
  next();
});

// const isAuthenticateUser = TryCatch(async (req, res, next) => {
//   const bearerHeader = req.headers["authorization"];
//   if (!bearerHeader) {
//     res.status(403).json({ resCode: 403, message: "Unauthorized access" });
//   }

//   const bearerToken = bearerHeader.split(" ")[1];
//   req.token = bearerToken;
//   const decodeData = await jwt.verify(bearerToken, process.env.JWT_SECRET);
//   req.user = await User.findById(decodeData.id);
//   next();
// });

// Middleware to authorize user roles
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    // Check if user role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      return next(
        res.json({
          failed: `Role : ${req.user.role} is not allowed to access this resource`,
        })
      );
    }
    next();
  };
};

module.exports = { isAuthenticateUser, authorizeRole };
