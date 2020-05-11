const mongoose = require('../utils/mongoose')
const Schema = mongoose.Schema
const Promise = require('bluebird')
const ArticleSchema = new Schema({
    title: String,
    author:String,
    content: String,
    creat_date: String,
    update_date: String,
    is_delete: Number,
    timestamp: Number,
})
const Article = mongoose.model('Article', ArticleSchema)

Promise.promisifyAll(Article)
Promise.promisifyAll(Article.prototype)
module.exports = Article
