const router = require('express').Router();
const { signinForm, signin, logout, googleAuth, googleAuthCb } = require('../controllers/auth.controller');

router.get('/signin/form', signinForm);
router.post('/signin', signin);
router.get('/logout', logout);

router.get('/google', googleAuth);
router.get('/google/cb', googleAuthCb);

module.exports = router;