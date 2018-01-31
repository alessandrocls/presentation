var mongoose = require('mongoose')

var passportLocalMongoose = require('passport-local-mongoose')

var userSchema = new mongoose.Schema({
    name: String,
    password: String,
    username: String,
    email: String,
    transaction: [{
        date: Date,
        cost: Number,
        category: String,
        description: String,
        createdAt: Date,
        updatedAt: Date
    }]
})

userSchema.plugin(passportLocalMongoose)

var User = mongoose.model('users', userSchema)

module.exports = User