const mongoose = require('../utils/mongoose')
const Schema = mongoose.Schema
const Promise = require('bluebird')
const FormsSchema = new Schema({
    form_title: String,
    design_id:String,
    filed_set: Array,
    creat_date: String,
    update_date: String,
    author:String,
    author_name:String,
    is_delete: Number,
    timestamp: Number,
})
const Forms = mongoose.model('Forms', FormsSchema)

Promise.promisifyAll(Forms)
Promise.promisifyAll(Forms.prototype)
module.exports = Forms
