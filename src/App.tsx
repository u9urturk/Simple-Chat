import './App.css'
import { WebSocketProvider } from './context/WebSocketContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import './index.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserProvider } from './context/UserContext';
import axios from 'axios';
import React from 'react';


axios.defaults.withCredentials = true;

const App: React.FC = () => {
  return (
    <UserProvider>

      <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<LoginPage></LoginPage>}></Route>
            <Route path='/register' element={<RegisterPage></RegisterPage>}></Route>
            <Route path='/chats' element={
              <React.Fragment>
                <WebSocketProvider>
                  <ChatPage />
                </WebSocketProvider>
              </React.Fragment>
            }></Route>
          </Routes>
        </Router>
      </div>

    </UserProvider>

  );
};

export default App
