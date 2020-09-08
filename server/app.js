var express = require('express');
var app = express();
const server= require('http').Server(app)
const socketio= require('socket.io')
const cors = require('cors')

//peer server
const ExpressPeerServer = require('peer').ExpressPeerServer;
const peerExpress = require('express');
const peerApp = peerExpress();
const peerServer = require('http').Server(peerApp);
const options = { debug: true }



const io= socketio(server)
app.set('view engine', 'ejs');
app.use(cors())
peerApp.use(cors())
app.use(express.urlencoded({ extended: false }));
io.on('connection',(socket)=>{
    socket.on('join',({id,userId})=>{
        console.log(`user ${userId} joined the room ${id}`)
        socket.join(id)
        socket.to(id).broadcast.emit("user-connected",userId)
    })
})

peerApp.get('/',(req,res)=>{
    res.send("heyy")
})

peerApp.use('/peerjs', ExpressPeerServer(peerServer, options));
app.use(require('./routes/indexrouter'));

peerServer.listen(3030)
server.listen(5000)
