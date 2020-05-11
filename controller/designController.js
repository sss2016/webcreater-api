const mongoose = require('../utils/mongoose')
const general = require('./general')
const moment = require('moment')
const strlen = require('../utils/tools').strlen
const Design = mongoose.model('Design')
var formController=require('./formController')
// const { list} = general
exports.addNewDesign=(req, res)=>{
    const {d_name,content,formfield} = req.body
    const userid = req.cookies.username || req.headers.username
    return Design.createAsync({
        d_name:d_name,
        author_name:userid,
        content:content,
        author:userid,
        creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        is_delete: 0,
        state:-1,
        timestamp: moment().format('X')
    })
        .then((e) => {
            console.log(e)
           return formController.addNewForm(e._id,formfield)
        }).then((e)=>{
            res.json({ code: 200, message: '保存成功!', data: e })
        })
        .catch(err => {
            res.json({ code: -200, message: err.toString() })
        })
}

exports.deleteDesign=(req,res)=>{
    general.deletes(req,res,Design)

}

exports.setDesignState=(req,res)=>{
    const {id, state } = req.query

    general.modify(res,Design,id,{state:parseInt(state)})
    
}
exports.getDesignByAuthorAndId=(req,res)=>{

    const filds = '_id content'
    let referer= req.headers.referer.substr(8)
    let paths = referer.split('/')
    let [author,id] = [paths[2]||null,paths[3]||null]
    console.log(author,id)
    Design.findOne({
         author:author,
         timestamp:id
     }, filds).then(function(result){
         console.log('result===',result)
        // var r_data =result.toJSON()
        // var text = renderToString(<Container datas={r_data.content} />)
        formController.getFormByDesignId(result._id).then(function(obj){
            console.log(obj)
            res.json({code:200,content:result.content,form_info:obj})
        })
     }).catch(err => {
        res.json({ code: -200, message: err.toString() })
    })
}
exports.getDesigns=(req, res)=>{
    general.list(req,res,Design,'-create_date',{is_delete:0})


}