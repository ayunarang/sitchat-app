import React from 'react'

const Message = (info) => {
    if(info.user){
        return (
            <div className="message-box" style={{justifyContent: `${info.styles}`}}>
            <div className={`message ${info.classs}`}>
              {`${info.user} : ${info.text}`}
            </div>
            </div>
          )
    }
    else{
        return (
            <div className="message-box" style={{justifyContent: `${info.styles}`}}>
            <div className={`message ${info.classs}`}>
              {`${info.user}: ${info.text}`}
            </div>
            </div>
          )
    }
  
}

export default Message
