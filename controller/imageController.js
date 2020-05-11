const mongoose = require('../utils/mongoose');
var path = require('path');
const general = require('./general')
const moment = require('moment')
// const strlen = require('../utils/tools').strlen
const Image = mongoose.model('Image');
exports.upLoadImage=(req,res)=>{
    let file = req.file;
    const userid = req.cookies.username || req.body.username
    return Image.createAsync({
        url:'http://localhost:4000/loadimg/'+file.filename,
        uid:file.filename,
        name:file.originalname,
        author:userid||'root',
        creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        is_delete: 0,
    }).then((e)=>{
         res.json({ code: 200, message: '保存成功!', data: e })
    })
    .catch(err => {
            res.json({ code: -200, message: err.toString() })
        })
}
exports.loadimg=(req,res)=>{
  let imgid = req.params.imgid;
  let file = path.join(__dirname,'../uploads/' + imgid);
  console.log(file);
  res.download(file); 
}
exports.getMyImages=(req,res)=>{
    const userid = req.cookies.username || req.headers.username
    let data = {author:userid||'root'}
    general.list(req,res,Image,'-create_date',data,null)

}