const mongoose = require('../utils/mongoose')
const Schema = mongoose.Schema
const Promise = require('bluebird')
const AdminSchema = new Schema({
    adminname: String,
    email: String,
    password: String,
    creat_date: String,
    update_date: String,
    is_delete: Number,
    timestamp: Number
})

const Admin = mongoose.model('Admin', AdminSchema)
Promise.promisifyAll(Admin)
Promise.promisifyAll(Admin.prototype)
module.exports = Admin

