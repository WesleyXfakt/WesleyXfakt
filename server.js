const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const scores = {}; // Keep scores for each room

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    // Join a specific room
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);

        // Send current room scores to the new connection
        if (!scores[roomId]) {
            scores[roomId] = { teamA: 0, teamB: 0 }; // Initialize room scores
        }
        socket.emit('updateScores', scores[roomId]);
    });

    // Handle score updates
    socket.on('changeScore', ({ roomId, newScores }) => {
        scores[roomId] = newScores; // Update the scores for the room
        io.to(roomId).emit('updateScores', scores[roomId]); // Broadcast to all clients in the room
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));