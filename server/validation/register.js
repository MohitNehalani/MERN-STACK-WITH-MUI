const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
//initially errors object will be empty  and empty errors obj means everything is fine and isValid is ture
    // then after validator validation if we get the errors then populate the errors obj with errors msg,..
    // in this case isEmpty(errors) will turn isValid false
    // if isValid is false then in router.post('/register) send res.status(400).json(errors)
    let errors = {};
    // before all that check if input is string even blank fields send by client musk be converted to ''(empty string)
    // because validator lib takes only string as arguments
    data.name = isEmpty(data.name) ? "" : data.name; // checking if input is empty then set it to ""(empty string)
    data.email = isEmpty(data.email) ? "" : data.email; // checking if input is empty then set it to ""(empty string)
    data.password = isEmpty(data.password) ? "" : data.password; // checking if input is empty then set it to ""(empty string)
    data.password2 = isEmpty(data.password2) ? "" : data.password2; // checking if input is empty then set it to ""(empty string)
    data.contactNumber = isEmpty(data.contactNumber) ? "" : data.contactNumber; // checking if input is empty then set it to ""(empty string)
    data.registeringAs = isEmpty(data.registeringAs) ? "" : data.registeringAs; // checking if input is empty then set it to ""(empty string)

    // validation using validator lib
    if (!Validator.isLength(data.name, {min: 2, max: 30})) {
        errors.name = 'Name must be between 2 and 30 characters';
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name is required';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Must be a valid email';
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if (!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must be between 6 and 30 characters';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Both password fields should match';
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Confirm password is required';
    }
    if (Validator.isEmpty(data.contactNumber)) {
        errors.contactNumber = 'Contact number is required';
    }
    if (Validator.isEmpty(data.registeringAs)) {
        errors.registeringAs = 'Registering as field is required';
    }
    return {
        errors: errors,
        isValid: isEmpty(errors)// global isEmpty() method
    }
}