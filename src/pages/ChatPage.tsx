import React from 'react';
import ChatInput from '../components/ChatInput';
import MessageList from '../components/MessageList';
import { useWebSocket } from '../context/WebSocketContext';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ChatPage: React.FC = () => {
    const { sendMessage, messages } = useWebSocket();
    const {user,logout} = useUser();
    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <header className="bg-primaryColor text-white p-4 shadow-md flex justify-between items-center">
                <h1 className="text-lg font-semibold">Aspaio</h1>
                <div className="flex items-center justify-center gap-x-2 ">
                    <span className="text-sm flex items-center justify-end">
                        Hoşgeldin,<p className='px-2 font-medium'>{user?.name}</p>
                    
                    </span>
                    
                    <Link to={"/"} onClick={logout} className='font-semibold '>Çıkış</Link>
                </div>
            </header>

            {/* Chat Area */}
            <div id="chat" className="flex-grow overflow-y-auto p-4 space-y-4 bg-white border-t border-b border-gray-300">
                {/* Mesajlar burada görüntülenecek */}

                <MessageList messages={messages} uid={user?user.id:""}></MessageList>

            </div>

            {/* Message Input */}
            <footer className="p-4 bg-gray-100 shadow-inner">
                <div className="flex items-center space-x-4">
                    <ChatInput sendMessage={sendMessage} username={user?.username} uid={user?user.id:""}></ChatInput>
                </div>
            </footer>
        </div>
    );
};

export default ChatPage;
