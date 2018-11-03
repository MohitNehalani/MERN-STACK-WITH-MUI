const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require("mongoose");
const Users = mongoose.model('users');
const keys = require("../config/keys");

// self made token extractor from request.cookie
var cookieExtractor = function (req) {
        var token = null;
        if (req && req.cookies)
        {
            token = req.cookies['jwt'];
        }
        return token;

};
//containing options to control how the
// token is extracted from the request or verified.
const opts = {};

// opts.jwtFromRequest =  ExtractJwt.fromAuthHeaderAsBearerToken();

if (process.env.NODE_ENV === "production") {
    opts.jwtFromRequest =  ExtractJwt.fromAuthHeaderAsBearerToken();
}
if (process.env.NODE_ENV !== "production") {
    opts.jwtFromRequest =  cookieExtractor;
}
// verifying the token's signature
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
    
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        opts.jwtFromRequest =  opts.jwtFromRequest === null ? cookieExtractor():null;
        //find the current user using payload
        Users.findById(jwt_payload.id)
            .then(user => {
            if (user){
                // return or attach user to req.body so that it could be send as response later in route.get('/current')
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
            .catch(err =>{console.log(err)})
    }))
};
