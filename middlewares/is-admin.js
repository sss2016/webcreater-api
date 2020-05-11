const checkJWT = require('../utils/check-jwt').checkJWT

module.exports = async (req, res, next) => {
    const admin = req.cookies.admin || req.headers.admin
    const adminid = req.cookies.adminid || req.headers.adminid
    const adminname = req.cookies.adminname || req.headers.adminname
    if (admin) {
        const check = await checkJWT(admin, adminid, adminname, 'admin')
        if (check) {
            next()
        } else {
            res.cookie('admin', '', { maxAge: 0 })
            res.cookie('adminid', '', { maxAge: 0 })
            res.cookie('adminname', '', { maxAge: 0 })
            return res.json({
                code: -500,
                message: '登录验证失败',
                data: ''
            })
        }
    } else {
        return res.json({
            code: -500,
            message: '请先登录',
            data: ''
        })
    }
}
