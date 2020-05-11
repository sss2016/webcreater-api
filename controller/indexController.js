import React from 'react';
import App from '../SSR/App'
const mongoose = require('../utils/mongoose');
// const general = require('./general')
// const moment = require('moment')
// const strlen = require('../utils/tools').strlen
const Design = mongoose.model('Design');
const {renderToString} = require('react-dom/server');
exports.showSSR=(req, res)=>{
    var id = req.params.id;
    var author = req.params.author
    const remember_me = new Date(Date.now() + 900000)
    Design.findOne({
        author:author,
        timestamp:id
    }).then(function(result){
       //  console.log(styles)
       // var r_data =result.toJSON()
       // var text = renderToString(<Container datas={r_data.content} />)

    if(result.state!==1||result.is_delete==1){
        res.render('showError',{
            msg:"未通过审核或已删除"
        })
    }else{
        const content = renderToString(<App datas={result.content}/>);
        res.cookie('author', author, { maxAge: remember_me })
        res.cookie('author_name', result.author_name, { maxAge: remember_me })
        res.send(`
            <!doctype html>
            <html>
                <title>${result.d_name}</title>
                <head>
                    <link rel="stylesheet" type="text/css" href="/ssr/bundle.css" >  
                </head>
                <body>
                    <div id="root" uu_name=${result.author_name} uu_id=${author}>${content}</div>
                </body> 
                <script src="/ssr/bundle.js"></script>
            </html>
        `);
    }
    
    //    res.json({code:200,content:result.content})
    }).catch(err => {

       res.render('showError',{
           msg:err
       })
   })
    
}