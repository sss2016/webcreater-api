const mongoose = require('../utils/mongoose')
const general = require('./general')
const moment = require('moment')
const strlen = require('../utils/tools').strlen
const Notice = mongoose.model('Notice')
const BellRecord = mongoose.model('BellRecord')

// const { list} = general
exports.addNewNotice=(req, res)=>{
    const {content} = req.body
    console.log('content',content)
    const title = "系统通知"+content.replace(/<[^>]+>/g,"");
    const userid = req.cookies.username || req.headers.username
    Notice.createAsync({
        title:title,
        content:content,
        admin:userid||'root',
        creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        is_delete: 0,
    })
        .then((data) => {
            res.json({ code: 200, message: '保存成功!', data: 'success' })
        })
        .catch(err => {
            res.json({ code: -200, message: err.toString() })
        })
}

exports.setNoticeState=(req,res)=>{
    let user_id = req.headers.userid
    let notice_id = req.query.notice_id
    BellRecord.createAsync({
        user_id:user_id,
        notice_id:notice_id,
        create_date: moment().format('YYYY-MM-DD HH:mm:ss'),
    })
        .then((data) => {
            res.json({ code: 200, message: '保存成功!', data: 'success' })
        })
        .catch(err => {
            res.json({ code: -200, message: err.toString() })
        })
}

exports.getAllNotice=(req,res)=>{
    general.list(req,res,Notice)
}
exports.getreadNotice=(req,res)=>{
   let user_id = req.headers.userid

    general.list(req,res,BellRecord,"-_id",{
        user_id:user_id
    })
    
}