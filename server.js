const { Server } = require('socket.io')
const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))

const server = app.listen(1010, console.log(1010))

const io = new Server(server)

io.on('connection', (socket) => {
    socket.on('new-user', (data) => {
        socket.broadcast.emit('joined-user', data)
    })

    socket.on('new-message', data => {
        socket.broadcast.emit('message', data)
    })
})