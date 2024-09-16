import React, { createContext, useContext, useEffect, useState } from 'react';
import { webSocketService } from '../services/webSocketService';

// WebSocketContext için TypeScript arayüzü
interface Message {
    uid:string;
    username:string;
    name:string
    message:string;
    creationTime:string;
}
interface WebSocketContextType {
    sendMessage: (data: {
        uid:string
        message:string
        creationTime:Date
    }) => void;
   
    messages:Message[];
}

// WebSocketContext oluşturuluyor
const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

// WebSocketProvider bileşeni
export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    useEffect(() => {
        // WebSocket bağlantısı kuruluyor
        webSocketService.connect();
        // WebSocket mesajlarını dinleyin
        webSocketService.onMessage((message) => {
            const parsedData = JSON.parse(message);
            if (parsedData.type === "any") {
            } else if (parsedData.type === "text") {
                setMessages(prevMessages => [...prevMessages, parsedData.content]);
            }
        });

        return () => {
            webSocketService.disconnect();
        };


    }, []);

    // Mesaj gönderme fonksiyonu
    const sendMessage = (data: {}) => {
        webSocketService.sendMessage(data);
    };

    return (
        <WebSocketContext.Provider value={{ sendMessage, messages }}>
            {children}
        </WebSocketContext.Provider>
    );
};

// WebSocketContext'ten değer almak için bir hook
export const useWebSocket = (): WebSocketContextType => {
    const context = useContext(WebSocketContext);
    if (context === undefined) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};
