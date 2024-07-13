const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const path = require('path');

// Create a new Express application.
const app = express();
const server = http.createServer(app);

// Serve static files from the "public" directory.
app.use(express.static(path.join(__dirname, 'public')));

// Create a new WebSocket server.
const wss = new WebSocket.Server({ server });

// Set up WebSocket connection handling.
wss.on('connection', socket => {
  console.log('Client connected');

  socket.on('message', message => {
    console.log(`Received message: ${message}`);
    // Broadcast the message to all clients.
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

// Set the server to listen on the port provided by Glitch.
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`WebSocket server is running on ws://localhost:${port}`);
});
