const http= require('http');
const express= require('express');
const cors= require('cors');
const socketIO= require('socket.io');

const app= express();

const server= http.createServer(app);
const PORT= 4500 || process.env.PORT;

app.use(cors());

app.get('/', (req, res)=>{
    res.send('Its Working');
})

const io= socketIO(server);

const users=[{}];


io.on("connection", (socket)=>{
    console.log('connection working');

    socket.on('joined', ({username})=>{
        users[socket.id]= username;
        console.log(`${username} has joined`);
        socket.broadcast.emit('userjoined', {user:"Admin", message:`${users[socket.id]} has joined`})
        socket.emit('welcome', {user:"Admin", message:`Welcome to the chat, ${users[socket.id]}`})
    } )

    socket.on('message', ({message , id})=>{
        io.emit('newmessage', ({user: users[socket.id], message, id}));
    })

    socket.on('disconnect', ()=>{
        socket.broadcast.emit('leave', ({user:"Admin", message:`${users[socket.id]}has left`}))
    })
})

server.listen(PORT, ()=>{
    console.log(`server is working on port : ${PORT}`);
})

