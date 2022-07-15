const jwt = require("jsonwebtoken");
const configuration = require("../../config/configuration");
const { User } = require('../../models/user');

const verifyToken = async (req, res, next) => {
    let token = req.header('Authorization');
   if(token){
     try {
       const decoded = jwt.verify(token, configuration.secret);
       const output = await User.findOne({}, {}, { email: decoded.data.email });
       req.user = output;
       next();
     } catch (err) {
       return res.status(401).send("Invalid Token");
     }
     return next();
   }


  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
};



const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = "961651509476-5t99tm8938bq3nq8ikof9be3753glh5u.apps.googleusercontent.com";
const GOOGLE_CLIENT_SCRETE = "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"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientScrete: GOOGLE_CLIENT_SCRETE,
    callbackURL: "/auth/google/callback",
    passReqToCallback: true
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    // User.findOrCreate({googleId: profile.id},
    //         function(err,user){
    //             returndone(err, user);
    //         });
}
));



module.exports = verifyToken;