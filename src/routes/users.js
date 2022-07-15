// const { User, validate } = require('../models/user');
// const express = require('express');
// const router = express.Router();

// router.post('/', async (req, res) => {
//     // First Validate The Request
//     const { error } = validate(req.body);
//     if (error) {
//         return res.status(400).send({message: "Provide correct user details"});
//     }

//     // Check if this user already exisits
//     let user = await User.findOne({ userName: req.body.userName });
//     if (user) {
//         return res.status(400).send('That user already exisits!');
//     } else {
//         // Insert the new user if they do not exist yet
//         user = new User({
//             userName: req.body.userName,
//             password: req.body.password
//         });
//         await user.save();
//         res.send(user);
//     }
// });

// module.exports = router;


// import { Router } from 'express';

// const router = express.Router();

// const User = require("./models/user");

// // Register
// app.post("/register", (req, res) => {
// // our register logic goes here...
// });

// // Login
// app.post("/login", (req, res) => {
// // our login logic goes here
// });
