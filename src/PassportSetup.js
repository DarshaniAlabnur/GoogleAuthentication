import passport from "passport";

const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = "961651509476-5t99tm8938bq3nq8ikof9be3753glh5u.apps.googleusercontent.com";
const GOOGLE_CLIENT_SCRETE = "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"

passport.serializeUser((user,done)=>{
    done(null, user);
})
passport.deserializeUser((user,done)=>{
    done(null, user);
})

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientScrete: GOOGLE_CLIENT_SCRETE,
    callbackURL: "/auth/google/callback",
    
},(accessToken, refreshToken, profile, done) => {
    console.log("=================");
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    return done(null, profile);
    
    // User.findOrCreate({googleId: profile.id},
    //         function(err,user){
    //             returndone(err, user);
    //         });
}));

