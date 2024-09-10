class WebSocketService {
    private socket: WebSocket | null = null;
    private onMessageCallback: ((message: string) => void) | null = null

    connect() {
        this.socket = new WebSocket('ws://localhost:8080');

        this.socket.onmessage = (event) => {
            if (this.onMessageCallback) {
                this.onMessageCallback(event.data);
            }
        }

        this.socket.onopen = () => {
            console.log("WebSocket connetion opened")
        }

        this.socket.onclose = () => {
            console.log("WebSocket connection closed")
        }

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    };


    disconnect() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    };

    sendMessage(data: {}) {
        const jsonData = JSON.stringify(data)
        console.log(jsonData)
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(jsonData);
        }
    };


    onMessage(callback: (message: string) => void) {
        this.onMessageCallback = callback;
    };


}

export const webSocketService = new WebSocketService();
