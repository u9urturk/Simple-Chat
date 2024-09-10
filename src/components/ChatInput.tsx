import React, { useState } from 'react';

interface ChatInputProps {
    socketId: string;
    username:string;

    sendMessage: (data: {
        socketId: string;
        message: string;
        creationTime:Date;
    }) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ sendMessage, socketId,username }) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.trim()) {
            const data = {
                socketId: socketId,
                username:username,
                message: inputValue,
                creationTime:new Date()
            }
            sendMessage(data);
            setInputValue(''); // Mesaj gönderildikten sonra input'u temizle
        }
    };

    return (
        <footer  className=" w-full ">
            <form onSubmit={handleSubmit} className="flex w-full items-center space-x-4">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={handleChange}
                    className="flex- w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit"  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Send
                </button>
            </form>
        </footer>
    );
};

export default ChatInput;
