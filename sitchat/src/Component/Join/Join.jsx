import React, { useState } from 'react'
import logo from '../../images/Screenshot_2023-11-02_143345-removebg-preview.png'
import { Link } from 'react-router-dom';
let username;

const Join = () => {
  const storeName= ()=>{
    const inputField= document.querySelector('#input-name');
    if(inputField.value!=""){
      username= inputField.value;
      inputField.value="";
    }
  }
  const [name, setname] = useState("");

  return (
    <div className="join-page">
      <div className="join-container">
        <img src={logo} class="logo"></img>
        <input onChange={(e)=>{setname(e.target.value)}} type="text" placeholder="Enter your name here" id="input-name"></input>
        <Link onClick={(event)=>{!name && event.preventDefault()}} to="/chat"><button onClick={storeName} class="login-button">Log In</button></Link>
      </div>
    </div>
  )
}

export default Join
export {username}

