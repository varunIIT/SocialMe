const socketIo=require('socket.io')
module.exports.chatSocket=function (chatServer) {
    let io=socketIo(chatServer)
    
    io.sockets.on('connection',function (socket) {
        console.log('new connection received',socket.id)

        socket.on('disconnect',function() {
            console.log('socket disconnected')
        })

        socket.on('join_room',function (data) {
            console.log('joining req. received',data)

            socket.join(data.chat_room)

            io.in(data.chat_room).emit('user_joined',data)
        })

        socket.on('send_message',function (data) {
            io.in(data.chat_room).emit('response_message',data)
        })
    })
    
}