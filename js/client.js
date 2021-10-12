const socket=io('http://localhost:8000');
const form=document.getElementById('sendcontainer')
const selectform=document.getElementById('sel')
const messageInput = document.getElementById('messageinp')
const topicInput = document.getElementById('tpc')
const messagecontainer=document.querySelector('.container')
const bodydiv=document.querySelector(".body")


selectform.addEventListener('submit',(e)=>{
    e.preventDefault();
    var topic = topicInput.value
    topicInput.value=''
    console.log(topic)
    bodydiv.style.background=`no-repeat center / cover url('https://source.unsplash.com/1600x900/?${topic}')`
})

const addMessage = (message,position)=>{
    const newdiv = document.createElement('div')
    newdiv.innerText = message;
    newdiv.classList.add('message')
    newdiv.classList.add(position)
    messagecontainer.append(newdiv)
}
var wishtle = new Audio('beep.mp3');
var pikachu = new Audio('pikachu.mp3');

const Name= prompt('enter your name to join')
socket.emit('new-user-joined', Name)
socket.on('user-joined',Name =>{
    pikachu.play();
    addMessage(`${Name} joined the chat`, 'left')
})
socket.on('receive', Nam=>{
    wishtle.play();
    addMessage(`${Nam.Name}: ${Nam.message}`, 'left')
})
socket.on('user-left', name=>{
    pikachu.play();
    addMessage(`${name} left the chat`, 'left')
})
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const text = messageInput.value;
    if (messageInput.value!=''){
        addMessage(`YOU: ${text}`, 'right');
    }
    messageInput.value=''
    socket.emit('send',text)
})
