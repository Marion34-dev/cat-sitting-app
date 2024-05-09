const express = require('express');
const router = express.Router();
const User = require('@modelUser');
const { sendHTTPResponse } = require('@httpResponses');

router.post('/', async (req, res) => {
  const { username, password, email } = req.body;

  try {
      // Create a new user record
      const newUser = await User.create({ username, password, email });
      //res.status(201).send('User created successfully.');
      return sendHTTPResponse(res, 201, 'User created successfully.');

  } catch (error) {
      console.error(error);
      //res.status(500).send('Internal server error.');
      return sendHTTPResponse(res, 500, 'Internal server error.');
  }
});


module.exports = router;
