const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticateUser = require('@authMiddleware');
const { sendHTTPResponse } = require('@httpResponses');
require('dotenv').config();

const secretKey = process.env.secretKey;

router.post('/', authenticateUser, (req, res) => {
  try {
    // Generate JWT token upon successful login
    const token = jwt.sign({ id: req.user.id, username: req.user.username, isPetSitter: req.user.isPetSitter }, secretKey);
    res.json({ token, isPetSitter: req.user.isPetSitter });
  } catch (error) {
    console.error(error);
    return sendHTTPResponse(res, 500, 'Internal server error.');
  }
});

module.exports = router;
