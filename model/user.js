const mongoose = require('../utils/mongoose')
const Promise = require('bluebird')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    creat_date: String,
    update_date: String,
    state:Number,
    is_delete: Number,
    timestamp: Number,

})

const User = mongoose.model('User', UserSchema)
Promise.promisifyAll(User)
Promise.promisifyAll(User.prototype)
module.exports = User
