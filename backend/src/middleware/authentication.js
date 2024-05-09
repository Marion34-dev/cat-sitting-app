const jwt = require('jsonwebtoken');
const User = require('@modelUser');
const bcrypt = require('bcrypt');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const authenticateUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database by username
    const user = await User.findOne({ where: { username } });

    // If user not found or password doesn't match, return '401 Unauthorized'
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid username or password.');
    }

    // Store temporarily the user object in the request for future use
    req.user = user;
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error.');
  }
};

module.exports = authenticateUser;
