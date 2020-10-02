const router = require('express').Router();
const tweetsRouter = require('./tweets.routes');
const userRouter = require('./users.routes');
const authRouter = require('./auth.routes');

router.use('/tweets', tweetsRouter)
router.use('/users', userRouter)
router.use('/auth', authRouter)

router.get('/', (req, res) => {
  res.redirect('/tweets');
});

module.exports = router;