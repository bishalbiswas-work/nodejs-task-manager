const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { validate, registerRules, loginRules } = require('../middleware/validators');

router.post('/register', validate(registerRules), register);
router.post('/login', validate(loginRules), login);

module.exports = router;
