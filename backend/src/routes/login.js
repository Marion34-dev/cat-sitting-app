const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticateUser = require('@authMiddleware');
const { sendHTTPResponse } = require('@httpResponses');

router.post('/', authenticateUser, (req, res) => {
  try {
    // Generate JWT token upon successful login
    const token = jwt.sign({ username: req.user.username }, secretKey);
    res.json({ token });
    
  } catch (error) {
      console.error(error);
      //res.status(500).send('Internal server error.');
      return sendHTTPResponse(res, 500, 'Internal server error.');
  }
});

module.exports = router;
