require("dotenv").config();

module.exports = {
    DataBase: process.env.DATABASE,
    secretOrKey: process.env.SECRET_OR_KEY
};