const mongoose = require('../utils/mongoose')
const Schema = mongoose.Schema
const Promise = require('bluebird')
const NoticeSchema = new Schema({
    admin: String,
    title:String,
    content:String,
    creat_date: String,
    is_delete: Number,
})
const Notice = mongoose.model('Notice', NoticeSchema)

Promise.promisifyAll(Notice)
Promise.promisifyAll(Notice.prototype)
module.exports = Notice
