const { app } = require('../app');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { findUserPerEmail, findUserPerId, findUserPerGoogleId, createGoogleUser } = require('../queries/users.queries');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserPerId(id);
    done(null, user)
  } catch (error) {
    done(error);
  }
})

passport.use('local', new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    const user = await findUserPerEmail(email);
    if (user) {
      const match = await user.comparePassword(password);
      if (match) {
        done(null, user);
      } else {
        done(null, false, { message: 'wrong password' });
      }
    } else {
      done(null, false, { message: 'user not found' });
    }
  } catch (error) {
    done(error);
  }
}))

passport.use('google', new GoogleStrategy({
  clientID: '526503092657-2o7nml5em5phms01ae7a9bcph3nuuifk.apps.googleusercontent.com',
  clientSecret: 'tmrkUZehrAFGD3rwaLY8g_rt',
  callbackURL: '/auth/google/cb'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await findUserPerGoogleId(profile.id);
    if(user) {
      done(null, user);
    } else {
      const savedUser = await createGoogleUser({
        displayName: profile.displayName, 
        id: profile.id, 
        email: profile.emails[0].value
      });      
      done(null, savedUser);
    }    
  } catch (error) {
    done(error);
  }
}))