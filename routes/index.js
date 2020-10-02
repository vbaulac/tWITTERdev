const router = require('express').Router();
const tweetsRouter = require('./tweets.routes');
const userRouter = require('./users.routes');
const authRouter = require('./auth.routes');
const { isLoggedIn } = require('../config/guards.config');

router.use('/tweets', isLoggedIn, tweetsRouter)
router.use('/users', userRouter)
router.use('/auth', authRouter)

router.get('/', (req, res) => {
  res.redirect('/tweets');
});

module.exports = router;