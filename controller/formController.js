const mongoose = require('../utils/mongoose')
const general = require('./general')
const moment = require('moment')
const strlen = require('../utils/tools').strlen
const Forms = mongoose.model('Forms')
const FormSubmit = mongoose.model('FormSubmit')
// const { list} = general
exports.addNewSubmit=(req, res)=>{
    const {form_obj,id,author} = req.body
    const userid = req.cookies.username || req.headers.username
    FormSubmit.createAsync({
        form_id:id,
        form_data:form_obj,
        author:author,
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
exports.addNewForm=(design_id, filed_set)=>{
    return Forms.createAsync({
        form_title:'临时标题',
        design_id:design_id,
        filed_set:filed_set,
        author:'userid',
        author_name:'默认',
        creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        is_delete: 0,
        timestamp: moment().format('X')
    })
}
exports.getFormByDesignId=(id)=>{
    let filds = '_id filed_set'
    return  Forms.findOne({
        design_id:id,
    }, filds)
}
exports.getFormsByAuthorId=(req,res)=>{
    
    general.list(req,res,Forms,'-create_date',{author:'userid'})
}
exports.getSubmitByformId=(req, res)=>{
    const { form_id } = req.query
    Forms.findOne({
        _id:form_id,
    }).then((data)=>{
        general.list(req,res,FormSubmit,'-create_date',{form_id:form_id},data)
    })

}