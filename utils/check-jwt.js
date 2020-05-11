
const jwt = require('jsonwebtoken')
// const config = require('../config')
const secretClient = 'you'
const secretServer = 'you'

exports.checkJWT = (token, userid, username, type) => {
    return new Promise(resolve => {
        const secret = type === 'user' ? secretClient : secretServer
        jwt.verify(token, secret, function(err, decoded) {
            if (!err && decoded.id === userid && (decoded.username === username || decoded.username === encodeURI(username))) {
                resolve(decoded)
            } else {
                console.log(err)
                resolve(false)
            }
        })
    })
}
