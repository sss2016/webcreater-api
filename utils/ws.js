const tools = require('../utils/tools')
module.exports = io => {
    io.on('connection', function(socket){
      //接受客户端传送的sendMessage命令
      socket.on('sendMessage', function(msg){
          // console.log(ioUserInfo);  //用户ioUserInfo
          console.log(msg)
          let resp = {
            title:msg.username,
            body:{
              isme:false,
              msg:msg.msg
            },
            time:tools.getTime(),
            TO:msg.TO,
            FROM:msg.FROM
          }
          tools.msgSender(socket,msg.TO,resp)
          //通过接受sendMessage这个action的数据再广播给所有'订阅的人'(即on了这个事件的)
          //socket.emit()发送信息给全部人,只要订阅了getMessage的人都会收到变量ioUserInfo和msg
          //socket.broadcast是发送除自己外的人
      });
    })
}