const mongoose = require('../utils/mongoose')
const Schema = mongoose.Schema
const Promise = require('bluebird')
const DesignSchema = new Schema({
    d_name: String,
    content: Array,
    creat_date: String,
    update_date: String,
    author:String,
    state:Number,
    author_name:String,
    is_delete: Number,
    timestamp: Number,
})
const Design = mongoose.model('Design', DesignSchema)

Promise.promisifyAll(Design)
Promise.promisifyAll(Design.prototype)
module.exports = Design
