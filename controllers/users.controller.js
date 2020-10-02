const { createUser } = require('../queries/users.queries');
const multer = require('multer');
const path = require('path');
const upload= multer({ storage: multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images/profiles'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})});

exports.signupForm = (req, res, next) => {
  res.render('users/user-form', { errors: null, isAuthenticated: req.isAuthenticated(), currentUser: req.user  });
}

exports.signup = async (req, res, next) => {
  const body = req.body;
  try {
    const user = await createUser(body);
    res.redirect('/');
  } catch (error) {
    res.render('users/user-form', { errors: [ error.message], isAuthenticated: req.isAuthenticated(), currentUser: req.user  });
  }
}

exports.updateImage = [
  upload.single('avatar'),
  async (req, res, next) => {
  try {
    const user = req.user;
    user.profile = `/images/profiles/${req.file.filename}`;
    await user.save();
    res.redirect('/');
  } catch (error) {
    next(error);
  }
}]