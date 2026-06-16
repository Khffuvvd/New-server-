const { WebSocketServer } = require('ws');
const PORT = process.env.PORT || 10000;
const wss = new WebSocketServer({ port: PORT }, () => {
console.log(⁠🚀 Signaling server is running on port ${PORT}⁠);
});
wss.on('connection', (ws) => {
console.log('📱 New client connected!');
ws.on('message', (message) => {
wss.clients.forEach((client) => {
if (client !== ws && client.readyState === 1) {
client.send(message.toString());
}
});
});
ws.on('close', () => {
console.log('❌ Client disconnected');
});
});
