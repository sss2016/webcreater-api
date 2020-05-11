const mongoose = require('../utils/mongoose')
const Schema = mongoose.Schema
const Promise = require('bluebird')
const FormSubmitSchema = new Schema({
    form_id: String,
    form_data: Object,
    creat_date: String,
    update_date: String,
    author:String,
    is_delete: Number,
    timestamp: Number,
})
const FormSubmit = mongoose.model('FormSubmit', FormSubmitSchema)

Promise.promisifyAll(FormSubmit)
Promise.promisifyAll(FormSubmit.prototype)
module.exports = FormSubmit
