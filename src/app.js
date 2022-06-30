const express = require('express')

const {Server} = require('socket.io')

const productRouter = require('./routes/products')
const Archivos = require('./container')
const options = require('../database')
const product = new Archivos(options)

const app = express();

app.use('/public', express.static(__dirname + '/public'))

app.set('views','./views');
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Listening in PORT ${PORT}`)
})



app.use('/', productRouter)

app.use('/', (req, res)=>{
    res.render( 'index', {product: product.data} )
})
const io = new Server(server)

io.on('connection', socket => {
    socket.on('add', data => {
        product.push(data)
        io.sockets.emit('show', product)
    })

    io.on('chat-in', data => {
        const dateString = new Date().toLocaleString()
        const dataOut = {
            messages: data.messages,
            username: data.username,
            date: dateString
        }
        messages.push(data)

        io.sockets.emit('chat-out', dataOut)
    })
})