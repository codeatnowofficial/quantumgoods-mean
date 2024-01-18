const mongoose = require('mongoose'),
{ Schema } = mongoose

const User = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

exports.userschema = mongoose.model('users', User)   