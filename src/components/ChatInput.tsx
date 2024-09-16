import React, { useState } from 'react';

interface ChatInputProps {
    uid: string;
    username:string |undefined; 

    sendMessage: (data: {
        uid: string;
        message: string;
        creationTime:Date;
    }) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ sendMessage, uid,username }) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.trim()) {
            const data = {
                uid: uid,
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
                    placeholder="Mesajın ..."
                    value={inputValue}
                    onChange={handleChange}
                    className="flex- w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor"
                />
                <button type="submit"  className="bg-primaryColor text-white px-4 py-2 rounded-lg hover:bg-primaryColorVol2">
                    Gönder
                </button>
            </form>
        </footer>
    );
};

export default ChatInput;
