import React, { useEffect, useRef, useState } from 'react';

interface Message {
    uid: string;
    username: string;
    name:string
    message: string;
    creationTime: string;
}
interface MessageListProps {
    messages: Message[];
    uid: string;
}


const MessageList: React.FC<MessageListProps> = ({ messages, uid }) => {
    const [isExpanded, setIsExpanded] = useState<Boolean>(false);
    const [key, setKey] = useState<Number>(0)
    const chatRef = useRef<HTMLDivElement | null>(null);
    const lastMessageRef = useRef<HTMLDivElement | null>(null); // Son mesajı takip etmek için ref
    const [showScrollToBottom, setShowScrollToBottom] = useState(false); // Bildirimi kontrol eden state


    useEffect(() => {
        if (lastMessageRef.current && !showScrollToBottom) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' }); // Yumuşak kaydırma
        }
       
    }, [messages]);

 
    

    // Bildirimi kontrol etmek için
    useEffect(() => {
        const handleScroll = () => {
            if (chatRef.current) {
               
                const heightScrollPercent = ((chatRef.current.scrollHeight - chatRef.current.scrollTop)/chatRef.current.clientHeight)*100;
                setShowScrollToBottom(heightScrollPercent>130 ? true : false);
            }
        };

        if (chatRef.current) {
            chatRef.current.addEventListener('scroll', handleScroll);
            return () => chatRef.current?.removeEventListener('scroll', handleScroll);
        }
    }, []);


    // "Yeni Mesaj" bildirimine tıklama olayı
    const scrollToBottom = () => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
            setShowScrollToBottom(false);
        }
    };


    const toggleMessageExpansion = (key: Number) => {
        setKey(key);
        setIsExpanded(!isExpanded);
    };
  
    return (
        <>
            <div ref={chatRef} className="flex-grow relative   overflow-y-auto h-full p-4 space-y-4 bg-white border-t border-b border-gray-300">

                {messages.map((msg, index) => (
                    <div key={index} ref={index === messages.length - 1 ? lastMessageRef : null} className={`flex items-end ${msg.uid === uid ? "justify-end" : ""} : `}>
                        <div className={`max-w-xs h-auto  flex-wrap flex flex-col  p-3 rounded-lg ${msg.uid === uid ? 'bg-gray-200 items-end text-gray-700' : 'bg-primaryColor items-start text-white'}`}>
                            <div className={`font-semibold ${msg.uid === uid ? 'hidden' : ''}`}>{msg.name}</div>

                            {/* Mesajı belirli uzunlukta kesip "..." ile gösterme */}
                            <p className={`flex-wrap break-all ${isExpanded && key === index ? '' : 'line-clamp-2'}`}>
                                {msg.message}
                            </p>

                            {/* "Tamamını Göster" veya "Gizle" düğmesi */}
                            {msg.message.length > 100 && (
                                <button className={`text-xs ${msg.uid === uid ? 'text-blue-500' : 'text-gray-300'}`} onClick={() => toggleMessageExpansion(index)}>
                                    {isExpanded ? 'Gizle' : 'Tamamını Göster'}
                                </button>
                            )}
                            <span className='text-xs opacity-45'>{new Date(msg.creationTime).toLocaleTimeString()}</span>
                        </div>
                    </div>
                ))}
               
            </div>
             {/* "Yeni Mesaj" Bildirimi */}
             {showScrollToBottom && (
                    <div
                        className="absolute bottom-20 left-[calc(50%-60px)] bg-blue-500 text-white text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer hover:bg-blue-600"
                        onClick={scrollToBottom}
                    >
                        Yeni Mesaj
                    </div>
                )}
        </>
    );
};

export default MessageList;
