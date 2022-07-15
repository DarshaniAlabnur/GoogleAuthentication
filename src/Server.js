const Database = require('./libs/Database');
const express = require('express');
const bodyparser = require('body-parser');
// const bcrypt = require('bcryptjs');
const joi = require('joi');
const configuration = require('./config/configuration');
const { User } = require('./models/user');
const verifyToken = require('./libs/routes/authMiddleware');
const jwt = require('jsonwebtoken');
const passport = require("passport");
require('./libs/routes/authMiddleware');
// const helper = require('./Controller/helper');


var app = express();
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

function isLoggedIn(req,res,next){
  req.user ? next(): res.sendStatus(401);
}

function logout(_,res){
  res.status(401).send("User logout");
}

app.get('/api/google', (req,res) => {
  res.send('<a href="/auth/google">Authentication with google</a>')
})

app.get('protected', isLoggedIn,(req,res) => {
  res.send(`Hello! ${req.user.displayName}`);
})

app.get('/auth/google',() => {
  passport.authenticate('google',{scope: ["profile","email"]});
  })

app.get('/google/callback',passport.authenticate('google',{
  successRedirect: '/proctected',
  failureRedirect: 'auth/failure',
})
);

app.get('/auth/failure', (req,res)=>{
  res.send("something went wrong...");
  })

app.get('/logout',(req,res)=>{
  req.logout();
  res.send("User logout");
})


app.post('/api/userLogin', async (req, res, next) => {
    const { name, email, designation, password } = req.body
    const user = await User.create({
        name,
        email: email.toLowerCase(),
        designation,
        password,
    });
    // const hashPassword = await helper.hashPassword(user.password);
    //     user.password = hashPassword;
    // if(user){
    //     const validatePassword = await bcrypt.compare(password, user.password);
    //     console.log(user, '===', validatePassword);
    // }
    // if(validPassword){
    //     const token = jwt.sign({ data: user }, configuration.secret, { expiresIn: '12h' });
    // }

    const token = jwt.sign({ data: user }, configuration.secret, { expiresIn: '12h' });
   return res.status(200).send({ message: "user added successfully", data: token });
    next();
});

app.get('/api/getSpecific', verifyToken, async (req, res, next) => {
    console.log('req.user',req.user);
    const output = req.user;
   return res.status(200).send({ message: "fetched specific data", data: output });
    next();
});

app.get('/api/getAll', verifyToken, async (_, res) => {
    res.setHeader('Content-Type', 'raw/json')
    try{
        const response = await User.find();
        console.log('============', response);
        res.status(200).json({ message: "getallllll", data: response });
    } catch(err){
        return res.status(400).json({ message: "Not recevied", err });
    }
    
});

const start = () => {
    try {
        app.listen(8080, () => console.log(`server is running on port: 8080`))
    } catch (error) {
        console.error(error);
    }
};
start();

// const Database = require('./libs/Database');
// const express = require('express')
// const app = express()

// const session = require('express-session')
// const passport = require('passport')

// const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

// //Middleware
// app.use(session({
//     secret: "secret",
//     resave: false ,
//     saveUninitialized: true ,
// }))

// app.use(passport.initialize()) // init passport on every route call
// app.use(passport.session())    //allow passport to use "express-session"


// //Get the GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET from Google Developer Console
// const GOOGLE_CLIENT_ID = "3184701-tn6finlstvgcgvte2381.apps.googleusercontent.com"
// const GOOGLE_CLIENT_SECRET = "XyLuTLHX6Ov_93IP"

// const authUser = (request, accessToken, refreshToken, profile, done) => {
//     return done(null, profile);
//   }

// //Use "GoogleStrategy" as the Authentication Strategy
// passport.use(new GoogleStrategy({
//     clientID:     GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3001/auth/google/callback",
//     passReqToCallback   : true
//   }, authUser));


// passport.serializeUser( (user, done) => { 
//     console.log(`\n--------> Serialize User:`)
//     console.log(user)
//      // The USER object is the "authenticated user" from the done() in authUser function.
//      // serializeUser() will attach this user to "req.session.passport.user.{user}", so that it is tied to the session object for each session.  

//     done(null, user)
// } )


// passport.deserializeUser((user, done) => {
//         console.log("\n--------- Deserialized User:")
//         console.log(user)
//         // This is the {user} that was saved in req.session.passport.user.{user} in the serializationUser()
//         // deserializeUser will attach this {user} to the "req.user.{user}", so that it can be used anywhere in the App.

//         done (null, user)
// }) 


// //Start the NODE JS server
// app.listen(8080, () => console.log(`Server started on port 8080...`))


// //console.log() values of "req.session" and "req.user" so we can see what is happening during Google Authentication
// let count = 1
// const showlogs = (req, res, next) => {
//     console.log("\n==============================")
//     console.log(`------------>  ${count++}`)

//     console.log(`\n req.session.passport -------> `)
//     console.log(req.session.passport)
  
//     console.log(`\n req.user -------> `) 
//     console.log(req.user) 
  
//     console.log("\n Session and Cookie")
//     console.log(`req.session.id -------> ${req.session.id}`) 
//     console.log(`req.session.cookie -------> `) 
//     console.log(req.session.cookie) 
  
//     console.log("===========================================\n")

//     next()
// }

// app.use(showlogs)


// app.get('/auth/google',
//   passport.authenticate('google', { scope:
//       [ 'email', 'profile' ] }
// ));

// app.get('/auth/google/callback',
//     passport.authenticate( 'google', {
//         successRedirect: '/dashboard',
//         failureRedirect: '/login'
// }));

// //Define the Login Route
// app.get("/login", (req, res) => {
//     res.render("login.js")
// })


// //Use the req.isAuthenticated() function to check if user is Authenticated
// const checkAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) { return next() }
//   res.redirect("/login")
// }

// //Define the Protected Route, by using the "checkAuthenticated" function defined above as middleware
// app.get("/dashboard", checkAuthenticated, (req, res) => {
//   res.render("dashboard.js", {name: req.user.displayName})
// })

// //Define the Logout
// app.post("/logout", (req,res) => {
//     req.logOut()
//     res.redirect("/login")
//     console.log(`-------> User Logged out`)})