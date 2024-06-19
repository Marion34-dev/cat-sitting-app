const express = require('express');
const router = express.Router();
const User = require('@modelUser');
const PetSitter = require('@modelPetSitter');
const { sendHTTPResponse } = require('@httpResponses');
const authenticate = require('@authMiddleware');

router.get('/profile', authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return sendHTTPResponse(res, 404, 'User not found.');
    }

    let responseData = { user };

    if (user.isPetSitter) {
      const petSitter = await PetSitter.findOne({ where: { userId } });
      if (petSitter) {
        responseData.petSitter = petSitter;
      }
    }

    return sendHTTPResponse(res, 200, responseData);
  } catch (error) {
    console.error(error);
    return sendHTTPResponse(res, 500, 'Internal server error.');
  }
});

module.exports = router;
