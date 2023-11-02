import React from 'react'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Join from './Component/Join/Join';
import './Component/Join/Join.css';
import Chat from './Component/Chat/Chat.jsx';
import './Component/Chat/Chat.css';
import Message from './Component/Message/Message.jsx';
import './Component/Message/Message.css';
import './App.css';


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" Component= {Join}/>
          <Route path="/chat" Component= {Chat}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
