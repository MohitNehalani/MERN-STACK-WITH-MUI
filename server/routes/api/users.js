const express = require("express");
const router = express.Router();
const Users = require("../../models/User");
const bcrypt = require('bcryptjs');
const secretOrKey = require("../../config/keys").secretOrKey;
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route  GET api/users/test
// @desc   Tests users route
// @access Public
router.get('/test', (req, res) => res.json({msg: "user works"}));

// @route  POST api/users/register
// @desc   adding new user
// @access Public
/*
* steps for registering new user
* 1 first validate the incoming data
* 1 find user on data base with email
* 2 if user exists then send res.status(400).json(response msg)
* 4 creating newUser object from req body to save on database
* 5 hashing password using bcrypt
* 6 saving newUser to database
* */
router.post('/register', (req, res) => {
    //server side validation of incoming data
    const {errors, isValid} = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    //checking if email already exists on db
    Users.findOne({email: req.body.email})
        .then(user => {
            if (user) {
                // if user email already exists
                // then setting response status to 400(bad request) with json msg
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            } else {
                // creating newUser object from req body to save on database
                const newUser = new Users({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    contactNumber: req.body.contactNumber,
                    registeringAs: req.body.registeringAs
                });
                /*
                             hashing password inside the modal
                                // // hashing password using bcrypt
                                // bcrypt.genSalt(10, (err, salt) => {
                                //     bcrypt.hash(newUser.password, salt, (err, hash) => {
                                //         if (err) throw err;
                                //         newUser.password = hash;
                                //     });
                                // });
                */

                //saving newUser to database
                newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
            }
        })
});

// @route  GET api/users/login
// @desc   loging in user / receiving token from server
// @access Public
/*
* steps for login and receiving  jwt authentication token from server
* 1 first validate the incoming data
* 1 find user on data base with email
* 2 if user exists then compare pasword hash with bcrypt
* 3 create token and sending it to user
* */
router.post('/login', (req, res) => {
    //server side validation of incoming data
    const {errors, isValid} = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    Users.findOne({email: email}).then(user => {
        if (!user) {
            errors.email = 'User not found';
            return res.status(404).json(errors)
        }
        user.comparePassword(password, (err, isMatch) => {
            if (!isMatch) {
                errors.incorrectPassword = "Password is incorrect";
                return res.status(400).json(errors)
            }

            user.generateToken((err, token) => {
                let bearerToken = 'Bearer ' + token;
                user.token = bearerToken;
                user.save().then(user =>{
                    //dont send bearer in cookie .. see cookieExtractor it require naked token w/o scheme
                    if (process.env.NODE_ENV === "production") {
                        res.status(200).json({
                            success: true,
                            user
                        })
                    }
                    if (process.env.NODE_ENV !== "production") {
                        res.cookie("jwt", token).status(200).json({
                            success: true,
                            user
                        })
                    }

                })

            })
        });
      /*  bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                //payload for token
                const payload = {
                    name: user.name,
                    id: user.id
                };

                //creating token and sending it to user
                jwt.sign(
                    payload,
                    secretOrKey,
                    {expiresIn: 60 * 60},
                    (err, token) => res.json({
                        success: true,
                        token: 'Bearer ' + token
                    }))
            } else {
                errors.password = "Password is incorrect";
                return res.status(400).json(errors);
            }*/

        })
    });
// @route  GET api/users/logout
// @desc   removing token from User collection
// @access protected

router.get('/logout', passport.authenticate("jwt", {session:false}), (req,res)=>{
    Users.findOneAndUpdate(
        { _id:req.user._id },
        { token: '' },
        (err,doc)=>{
            if(err) return res.json({success:false,err});

            if (process.env.NODE_ENV !== "production") {
                return res.clearCookie("jwt", {path: '/'}).status(200).json({
                    success: true
                })
            }
            return res.status(200).json({
                success: true
            })
        }
    )
});


// @route  GET api/users/current
// @desc   current user profile
// @access protected
/*

* Steps for authenticating users for protected route using jwt authentication token from server
* 1 inside server.js/app.js apply passport middleware
app.use(passport.initialize());
2 create the passport.js file in config folder and apply middleware function on passport
then require that in server.js as
 running the exported function from "./config/passport" with passport as parameter
require("./config/passport")(passport);
in passport.js we attached the user info to request before it reached the router.get('/current) below
3 then access the user and send the res inside route.get('/current)
* */
router.get('/current', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        res.json({
            user:req.user
        })
    });


router.post('/update_profile',passport.authenticate('jwt', {session: false}),(req,res)=>{

   Users.findOneAndUpdate(
       { _id: req.user._id },
       {
          "$set": req.body
       },
       { new: true },
       (err,doc)=>{
          if(err) return res.json({success:false,err});
          return res.status(200).json({
             success:true,
             user:doc
          })
       }
   );
});

module.exports = router;