const mongoose = require('../utils/mongoose')
const Schema = mongoose.Schema
const Promise = require('bluebird')
const ImageSchema = new Schema({
    author: String,
    name:String,
    uid:String,
    creat_date: String,
    url:String,
    is_delete: Number,
})
const Image = mongoose.model('Image', ImageSchema)

Promise.promisifyAll(Image)
Promise.promisifyAll(Image.prototype)
module.exports = Image
