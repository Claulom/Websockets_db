const express = require('express')
const http = require('http')
const {Server} = require('socket.io')

const productRouter = require('./routes/products')
const sqlite = require('./containerMsg')
const { newMessage } = require('./containerMsg')

const app = express();
const httpServer = http.createServer( app );
const io = new Server(httpServer)

const PORT = process.env.PORT || 8080;
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('./public'))

app.set('view engine', 'ejs');
app.set('views',__dirname+'/views');

io.on('connection', socket => {
    console.log('Usuario conectado, ID: ' + socket.id);
    sqlite.getAll().then(messages =>{
        socket.emit('messages', messages)
    })
    socket.on('newMessage', (newMessage)=>{
        sqlite.newMessage(newMessage)
        .then(sqlite.getAll()
        .then(messages => io.sockets.emit('messages', messages)))
    })
})

app.use('/', productRouter)

const server = httpServer.listen(PORT, ()=>{
    console.log(`Server on PORT: ${PORT}`)
})
server.on('error', err => console.log('Error en el server: ' + err) )

