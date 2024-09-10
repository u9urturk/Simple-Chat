import React, { useState } from 'react';
import ChatInput from '../components/ChatInput';
import MessageList from '../components/MessageList';
import { useWebSocket } from '../context/WebSocketContext';

const ChatPage: React.FC = () => {
    const { sendMessage, messages, socketId } = useWebSocket();
    const [username, setUsername] = useState<string>("");
    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
                <h1 className="text-lg font-semibold">Chat Application</h1>
                <div className="flex items-center justify-center gap-x-2 ">
                    <span className="text-sm flex items-center justify-end">
                        Welcome,
                        <input
                            onChange={(e) => { setUsername(e.target.value)}}
                            type="text"
                            className="min-w-12 w-24 outline-none py-2 bg-transparent text-white font-semibold px-2"

                        /> !
                    </span>
                    <img
                        src="https://via.placeholder.com/40"
                        alt="Profile"
                        className="rounded-full w-10 h-10"
                    />
                </div>
            </header>

            {/* Chat Area */}
            <div id="chat" className="flex-grow overflow-y-auto p-4 space-y-4 bg-white border-t border-b border-gray-300">
                {/* Mesajlar burada görüntülenecek */}

                <MessageList messages={messages} socketId={socketId}></MessageList>

            </div>

            {/* Message Input */}
            <footer className="p-4 bg-gray-100 shadow-inner">
                <div className="flex items-center space-x-4">
                    <ChatInput sendMessage={sendMessage} username={username} socketId={socketId}></ChatInput>
                </div>
            </footer>
        </div>
    );
};

export default ChatPage;
