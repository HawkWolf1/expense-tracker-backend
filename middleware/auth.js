const jwt = require('jsonwebtoken');
const User = require('../models/userTable');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    console.log(token);
    const user = jwt.verify(token, 'Rockettt');
    console.log(user.userId);
    const newUser = await User.findOne({ _id: user.userId }); // Assuming you are using the _id field for user identification
    console.log(JSON.stringify(newUser));

    if (newUser) {
      req.user = newUser; // Attach the user to the request object for future use
      next(); // Proceed to the next middleware or route handler
    } else {
      return res.status(401).json({ success: false }); // Unauthorized if user not found
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false });
  }
};

module.exports = {
  authenticate,
};