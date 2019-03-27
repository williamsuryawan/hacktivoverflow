const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hashPassword = require('../helpers/hashPassword');

const userSchema = new Schema ({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
    }
})

userSchema.pre('save', function (next) {
    if(this.password) {
        this.password = hashPassword(this.password);
    }
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;