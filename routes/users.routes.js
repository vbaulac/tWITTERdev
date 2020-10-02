const router = require('express').Router();
const { signup, signupForm, updateImage } = require('../controllers/users.controller');
const { isLoggedIn } = require('../config/guards.config');

router.get('/signup/form', signupForm);
router.post('/signup', signup);
router.post('/update/image',isLoggedIn, updateImage);

module.exports = router;