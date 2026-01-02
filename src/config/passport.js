const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${[process.env.SERVER_URL]}/auth/google/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const rawAvatar = profile.photos?.[0]?.value;
        const avatar = rawAvatar
          ? rawAvatar.replace(/^http:/, "https:")
              .split("=")[0] + "=s96-c"
          : null;

        const [user, created] = await User.findOrCreate({
          where: { googleId: profile.id },
          defaults: {
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar
          }
        });

        // 🔥 THIS IS THE MISSING PART
        if (!created && avatar && user.avatar !== avatar) {
          user.avatar = avatar;
          await user.save();
        }

        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});

module.exports = passport;
