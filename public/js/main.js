const socket = io()
const names = prompt('Enter your name')
// html template
const chat = document.querySelector('.chat__people')
const form = document.getElementById('form')
const input = document.getElementById('input')
const h4 = document.getElementById('h4')
h4.innerHTML += 'You joined'


socket.emit('new-user', names)
socket.on('joined-user', (data) => {
    const h3 = document.createElement('h4')
    h3.innerHTML += `${data} joined`
    chat.appendChild(h3)
})

socket.on('message', (data) => {
    const p = document.createElement('p')
    p.setAttribute('class', "chat__title2")
    p.innerHTML += `${data.names}:  ${data.message}`
    chat.appendChild(p)
})


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const p = document.createElement('p')
    p.setAttribute('class', 'chat__title')
    p.innerHTML += `You: ${input.value}`
    chat.appendChild(p)

    socket.emit('new-message', {
        names,
        message:input.value
    })
})