const MSGHEAD = 'Message'
exports.strlen = str => {
    let charCode = -1
    let realLength = 0
    const len = str.length
    for (let i = 0; i < len; i++) {
        charCode = str.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) realLength += 1
        else realLength += 2
    }
    return realLength
}
exports.getTime=()=>{
    var date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth()+1,
    day = date.getDate(),
     hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds();
  return year+'年'+month+'月'+day+'日 '+hour+':'+minute;
  }
  exports.msgSender=(socket,user,msg)=>{
    
    socket.broadcast.emit(MSGHEAD+''+user, msg);
  }