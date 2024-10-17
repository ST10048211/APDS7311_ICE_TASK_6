const express = require('express');
const { check, validationResult } = require('express-validator');
const { signup } = require('../controllers/authController');
const router = express.Router();

router.post(
  '/signup',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    signup(req, res);
  }
);

module.exports = router;
