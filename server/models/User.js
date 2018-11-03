const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretOrKey= require("../config/keys").secretOrKey;
// convention for modals is ... singular and capitalize eg this file name .... User.js

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxLength: 80
    },
    email:{
        type:String,
        required:true,
        trim: true
    },
    password:{
        type:String,
        required:true,
        minLength: 6
    },
    registeringAs:{
        type:String,
    },
    token:{
        type:String,
    },
    role:{
        type:Number,
        default: 0
    },
    contactNumber:{
        type:String,
        required: true,
        maxLength: 20
    },
    address: [
        {// this object will have 8 properties
            // 1. default _id given by mongoose
            // 2-8. named as below ... given by us in post request for likes
            addressLine1: {
                type: String,
            },
            addressLine2: {
                type: String,
            },
            city: {
                type: String
            },
            zipCode: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now()
            },
            state: {
                type: String,
            },
            country: {
                type: String,
                default: 'India'
            },
        }
    ],
    cart:{
        type:Array,
        default: []
    },
    ordersHistory: {
        type:Array,
        default: []
    },
    date:{
        type:Date,
        default: Date.now()
    },
});

// before registering new user hash password
UserSchema.pre("save", function (next) {
    var user = this;

    //check if modifying password or something else
    if (user.isModified('password')){
        // if user is modifying password .. or new user
        // then hashing password using bcrypt
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) throw err;
                user.password = hash;
                next()
            });
        });
    } else {
        // continue without modifying password of existing user
       next()
    }
});

UserSchema.methods.comparePassword = function(candidatePassword, cb){
    let user = this;
    bcrypt.compare(candidatePassword, user.password)
        .then(isMatch => cb(null, isMatch))
        .catch(err => console.log(err))
};
UserSchema.methods.generateToken = function(cb){
    let user = this;
    const payload = {
        name: user.name,
        id: user._id
    };

    //creating token and sending it to user
    jwt.sign(
        payload,
        secretOrKey,
        {expiresIn: 60 * 60},
        (err, token) => {
            if (err) console.log(err);
            cb(null, token)
        })
};

module.exports = Users = mongoose.model('users', UserSchema);