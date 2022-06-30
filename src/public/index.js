const socket = io()

let username = localStorage.getItem('username')
if (username == null) {
    username = prompt('Ingrese username')
    localStorage.setItem('username', username)
}

if (username) {
    document.getElementById('username').innerHTML = `Welcome ${username}`
}

const btn = document.getElementById('load')
const btnSend = document.getElementById('send')

btn.onclick = e => {
    e.preventDefault() 

    const name = document.getElementById("name").value
    const price = document.getElementById("price").value
    const thumbnail = document.getElementById("thumbnail").value

    socket.emit('load', {name, price, thumbnail, username})
}

btnSend.onclick = e => {
    e.preventDefault() 

    const messages = document.getElementById("msn").value

    socket.emit('chat-in', messages)
}

socket.on('show', products => {
    console.log(products)

    fetch('/products')
        .then(r => r.text())
        .then(html => {
            const div = document.getElementById("products")
            div.innerHTML = html
        })
        .catch(e => alert(e))

})

socket.on('chat-out', () => {

    fetch('/messages')
        .then(r => r.text())
        .then(html => {
            const div = document.getElementById("chat")
            div.innerHTML = html
        })
        .catch(e => alert(e))

}) 