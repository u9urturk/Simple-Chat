import './App.css'
import { WebSocketProvider } from './context/WebSocketContext';
import ChatPage from './pages/ChatPage';
import './index.css'; 


const App: React.FC = () => {
  return (
    <WebSocketProvider>
      <div className="App">
        <ChatPage />
      </div>
    </WebSocketProvider>
  );
};

export default App
