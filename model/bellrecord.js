const mongoose = require('../utils/mongoose')
const Schema = mongoose.Schema
const Promise = require('bluebird')
const BellRecordSchema = new Schema({
    user_id: String,
    notice_id:String,
    create_time: String,
})
const BellRecord = mongoose.model('BellRecord', BellRecordSchema)

Promise.promisifyAll(BellRecord)
Promise.promisifyAll(BellRecord.prototype)
module.exports = BellRecord
