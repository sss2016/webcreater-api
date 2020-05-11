const mongoose = require('../utils/mongoose')
const general = require('./general')
const moment = require('moment')
const strlen = require('../utils/tools').strlen
const Article = mongoose.model('Article')
// const { list} = general
exports.addNewArticle=(req, res)=>{
    const {author,content,title} = req.body
    const userid = req.cookies.username || req.headers.username
    Article.createAsync({
        title:title,
        content:content,
        author:userid||'root',
        creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        is_delete: 0,
        timestamp: moment().format('X')
    })
        .then((data) => {
            res.json({ code: 200, message: '保存成功!', data: 'success' })
        })
        .catch(err => {
            res.json({ code: -200, message: err.toString() })
        })
}

exports.deleteArticle=(req,res)=>{
    general.deletes(req,res,Article)
}

exports.getArticlesByAuthorId=(req,res)=>{
    const userid = req.cookies.username || req.headers.username
    general.list(req,res,Article,'-create_date',{author:userid})
}
exports.getArticleById=(req, res)=>{
    const { artcle_id } = req.query
    Article.findOne({
        _id:artcle_id,
    }).then((data)=>{
        res.json({ code: 200, message: 'ok!', data: data })
    }).catch(err => {
        res.json({ code: -200, message: err.toString() })
    })

}