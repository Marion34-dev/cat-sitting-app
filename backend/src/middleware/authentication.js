const User = require('@modelUser');
const { sendHTTPResponse } = require('@httpResponses');

const authenticateUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database by username
    const user = await User.findOne({ where: { username } });

    // If user not found
    if (!user) {
      console.log('User not found');
      return sendHTTPResponse(res, 401, 'Invalid username.');
    }

    // Compare passwords directly
    if (user.password !== password) {
      console.log('Password mismatch');
      return sendHTTPResponse(res, 401, 'Invalid password.');
    }

    // Store temporarily the user object in the request for future use
    req.user = user;
    next(); // Proceed to the next middleware

  } catch (error) {
    console.error(error);
    return sendHTTPResponse(res, 500, 'Internal server error.');
  }
};

module.exports = authenticateUser;
