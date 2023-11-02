import React, { useEffect, useState} from 'react'
import socketIO from 'socket.io-client'
import { username } from '../Join/Join';
import sendButton from '../../images/icons8-send-button-50.png';
import Message from '../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import logo from '../../images/logo-name.png';
import closeButton from '../../images/icons8-close-button-32.png';

const ENDPOINT= 'https://sitchat-app.onrender.com/';
let socket;
let message;

const Chat = () => {
  const sendIcon = document.querySelector('.send-icon');
  const messageSendButton= document.querySelector('.message-send-button');
  const [id, setid] = useState([]);
  const [messages, setmessages] = useState([]);


  const send=()=>{
    message= document.querySelector('.message-input-box').value;
    if(message!=""){
    
    socket.emit('message', { message, id});
    document.querySelector('.message-input-box').value="";
    messageSendButton.addEventListener('click', function() {
    sendIcon.style.transform = 'translateX(10px) translateY(-2px)';
    setTimeout(function() {
    sendIcon.style.transform = 'translateX(0) translateY(0)';
  }, 300); 
});
    }
  }

const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      send();
    }
};

useEffect(() => {
  socket= socketIO(ENDPOINT, {transports: ['websocket']} );
  socket.on('connect', ()=>{
    console.log('connection establish');
    setid(socket.id);
  })

  socket.emit('joined', {username});

  socket.on('welcome', (data)=>{
    setmessages([...messages, data]);
    console.log(data.user, data.message);
  })

  socket.on('userjoined', (data)=>{
    setmessages([...messages, data]);
    console.log(data.user, data.message);
  })

  return () => {
    socket.emit('disconect', (data)=>{
      setmessages([...messages, data]);
      console.log(data.user, data.message);
    });
    socket.off();
  }
}, []);

useEffect(() => {
  socket.on('newmessage', (data)=>{
    setmessages([...messages, data]);
    console.log(data.user, data.message, data.id);
  })

  return() => {
    socket.off();
    
  }
}, [messages]);


  return (
    <div>
      <div className="chat-page">
        <div className="chat-container">
          <div className="header">
            <img src={logo} className="chat-logo"></img>
            <a href="/" className="close-button-event"><img src={closeButton} className="close-button"></img></a>
          </div>
          <ReactScrollToBottom className="message-display-box">
           {
            messages.map((item, i)=><Message key={i} user={item.user} text={item.message} classs={item.id===id?"right":"left"} styles={item.id===id?"flex-end":"flex-start"}/>)
           }
           </ReactScrollToBottom>
          <div className="message-send-box">
          <input onKeyDown= {handleKeyDown} type='text' placeholder='Enter message here' className="message-input-box"></input>
          <button onClick={send} className='message-send-button'><img src={sendButton} className='send-icon'></img></button>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Chat
