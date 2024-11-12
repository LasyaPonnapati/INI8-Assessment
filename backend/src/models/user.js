const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "your Name is mandatory to enter"], trim: true, 
                minLength:[2,"minimum of 2 characters are required for the name"],
                maxLength: [50, "maximum length allowed is 50 characters, please shorten it"],
                validate: {
                    validator: function(value) {
                        return validator.isAlpha(value, 'en-US', { ignore: ' ' });
                    },
                    message: "Name should contain only alphabets and spaces"
                } 
    },
    emailId: { type: String, required: [true, "your emailId is mandatory to enter"], lowercase: true, trim: true, unique:true,
        validate: {
            validator: function(value) {
                return validator.isEmail(value);
            },
            message: "Please enter a valid email address"
        }
    },
    password: { type: String, required: [true, "your password is mandatory to enter"], trim: true,
        validate: {
            validator: function(value) {
                return validator.isStrongPassword(value);
            },
            message: "Please enter a strong password"
    } },
    DOB: { 
        type: Date, 
        required: [true, "Date of birth is mandatory"], 
        validate: {
            validator: function(value) {
                const today = new Date();
                return value < today;
            },
            message: "please enter a valid date"
        }
    },
    dpURL:{
        type: String,
        default:"https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg",
        validate: {
            validator: function(value) {
                return validator.isURL(value);
            },
            message: "Please enter a valid URL"
        }
    }
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);