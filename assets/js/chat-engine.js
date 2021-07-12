class chatEngine {
    constructor(chatBoxId, userEmail, userName) {
        this.chatBox = `#${chatBoxId}`
        this.userEmail = userEmail
        this.userName=userName

        this.socket = io.connect('https://socialme-v1.herokuapp.com/'||'http://localhost:5000')
        this.connectionHandler()
    }
    connectionHandler() {
        let self = this
        this.socket.on('connect', function () {
            console.log('connection established using sockets!')

            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chat_room: 'SocialMe',
                user_name:self.userName
            })

            self.socket.on('user_joined', function (data) {
                console.log('a user joined', data)
            })

            let sendMessage = $('#send-message')//send button

            sendMessage.on('click', function (e) {//event listener after clicing send button
                let msg = $('#chat-input').val()//msg to be sent

                if (msg != '')//do nothing as empty message can'nt be sent
                {
                    self.socket.emit('send_message',{
                        message:msg,//message to be sent
                        user_email:self.userEmail,//sender's email for identity
                        user_name:self.userName,//sender's name for identity
                        chat_room:'SocialMe'//'SocialMe' chatroom
                    })
                }

            })
            self.socket.on('response_message',function(data) {
                let classValue='receiver'//classValue is to give dynamic class value of whether it is a sender or receiver
                let sender=data.user_name
                if(data.user_email==self.userEmail){
                    classValue='sender'
                    sender='You'
                }
                $('#chat-messages').append(// appending the li item contianing message and sender in chatbox
                `<div class="${classValue}">
                    <span>${data.message}</span><br>
                    <small><b><i>${sender}</i></b></small>
                </div>`)
            })  

            
        })
       

    }
}

