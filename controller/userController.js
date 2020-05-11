const md5 = require('md5')
const jwt = require('jsonwebtoken')
const mongoose = require('../utils/mongoose')
const moment = require('moment')
const strlen = require('../utils/tools').strlen
const User = mongoose.model('User')
const Admin = mongoose.model('Admin')
const md5Pre = 'fuck'
const secret = 'you'
const general = require('./general')
const { list} = general

exports.getList = (req, res) => {
    list(req, res, User)
}

/**
 * 用户登录
 * @method login
 * @param  {[type]}   req [description]
 * @param  {[type]}   res [description]
 * @return {[type]}       [description]
 */
exports.login = (req, res) => {
    let json = {}
    let { username } = req.body
    const { password } = req.body
    if (username === '' || password === '') {
        res.json({ code: -200, message: '请输入用户名和密码' })
    }
    User.findOneAsync({
        username,
        password: md5(md5Pre + password),
        is_delete: 0
    })
        .then(result => {
            if (result&&result.state===1) {
                username = encodeURI(username)
                const id = result._id
                const email = result.email
                const remember_me = new Date(Date.now() + 900000)
                const token = jwt.sign({ id, username }, secret, { expiresIn: 60 * 60 * 24 * 30 })
                res.cookie('user', token, { maxAge: remember_me })
                res.cookie('userid', id, { maxAge: remember_me })
                res.cookie('username', username, { maxAge: remember_me })
                res.cookie('useremail', email, { maxAge: remember_me })
                json = {
                    code: 200,
                    message: '登录成功',
                    data: {
                        user: token,
                        userid: id,
                        username,
                        email
                    }
                }
            } else {

                json = {
                    code: -200,
                    message:result.state==0? '用户被冻结，暂未激活': '用户名或者密码错误'
                }
            }
            res.json(json)
        })
        .catch(err => {
            res.json({ code: -200, message: err.toString() })
        })
}

exports.setuserstate = (req, res) => {
    const {id, state } = req.body

    general.modify(res,User,id,{state:parseInt(state)})

}
exports.adminlogin = (req, res) => {
    let json = {}
    let { username } = req.body
    const { password } = req.body
    if (username === '' || password === '') {
        res.json({ code: -200, message: '请输入用户名和密码' })
    }
    console.log(username,password,md5(md5Pre + password))
    Admin.findOneAsync({
        adminname:username,
        password: md5(md5Pre + password),
        is_delete: 0
    })
        .then(result => {
            console.log(result)
            if (result) {
                username = encodeURI(username)
                const id = result._id
                const remember_me = new Date(Date.now() + 900000)
                const token = jwt.sign({ id, username }, secret, { expiresIn: 60 * 60 * 24 * 30 })
                res.cookie('admin', token, { maxAge: remember_me })
                res.cookie('adminid', id, { maxAge: remember_me })
                res.cookie('adminname', username, { maxAge: remember_me })
                json = {
                    code: 200,
                    message: '登录成功',
                    data: {
                        admin: token,
                        adminid: id,
                        adminname:username,
                    }
                }
            } else {
                json = {
                    code: -200,
                    message: '用户名或者密码错误'
                }
            }
            res.json(json)
        })
        .catch(err => {
            res.json({ code: -200, message: err.toString() })
        })
}

exports.delete = (req,res)=>{
    general.deletes(req,res,User)
}
exports.addadmin =(req, res)=>{
    const {adminname,password,email} = req.query
    return Admin.createAsync({
        adminname,
        password: md5(md5Pre + password),
        email,
        creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        is_delete: 0,
        timestamp: moment().format('X')
    })
        .then(() => {
            res.json({ code: 200, message: '注册成功!', data: 'success' })
        })
        .catch(err => {
            res.json({ code: -200, message: err.toString() })
        })
}
exports.insert = (req, res) => {
    const { email, password, username } = req.body
    if (!username || !password || !email) {
        res.json({ code: -200, message: '请将表单填写完整' })
    } else if (strlen(username) < 4) {
        res.json({ code: -200, message: '用户长度至少 2 个中文或 4 个英文' })
    } else if (strlen(password) < 8) {
        res.json({ code: -200, message: '密码长度至少 8 位' })
    } else {
        User.findOneAsync({ username })
            .then(result => {
                if (result) {
                    res.json({ code: -200, message: '该用户名已经存在!' })
                } else {
                    return User.createAsync({
                        username,
                        password: md5(md5Pre + password),
                        email,
                        state:1,
                        creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                        update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                        is_delete: 0,
                        timestamp: moment().format('X')
                    })
                        .then(() => {
                            res.json({ code: 200, message: '注册成功!', data: 'success' })
                        })
                        .catch(err => {
                            res.json({ code: -200, message: err.toString() })
                        })
                }
            })
            .catch(err => {
                res.json({ code: -200, message: err.toString() })
            })
    }
}
