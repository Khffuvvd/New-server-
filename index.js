const { WebSocketServer } = require('ws');
const port = process.env.PORT || 10000;
const server = new WebSocketServer({ port: port }, () => {
    console.log(`📡 Signaling server is running on port ${port}`);
});

server.on('connection', (ws) => {
    console.log('📱 New client connected!');
    ws.on('message', (message) => {
        server.clients.forEach((client) => {
            if (client !== ws && client.readyState === 1) {
                client.send(message.toString());
            }
        });
    });
    ws.on('close', () => {
        console.log('❌ Client disconnected');
    });
});
