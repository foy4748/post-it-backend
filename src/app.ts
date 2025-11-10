import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalRoutes from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandlers';
import cookieParser from 'cookie-parser';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import config from './app/config';

const app: Application = express();
const server = createServer(app);
// Socket.IO setup with CORS for Next.js frontend
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', String(config.frontendLink)],
    methods: ['GET', 'POST'],
  },
  transports: ['websocket', 'polling'],
});

global.io = io;
// Socket.IO connection handling
export const connectedUsers = new Map();
io.on('connection', (socket) => {
  console.log('🔗 User connected:', socket.id);

  // Join user to a specific room (e.g., user ID)
  socket.on('join-user', (userId) => {
    socket.join(userId);
    connectedUsers.set(socket.id, userId);
    console.log(`User ${userId} joined room`);
  });

  // Join user to a notification room
  socket.on('join-notifications', (userId) => {
    socket.join(`notifications-${userId}`);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('❌ User disconnected:', socket.id);
    connectedUsers.delete(socket.id);
  });

  // Handle client errors
  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      String(process.env.frontendLink),
    ],
    credentials: true,
  }),
);

// App Routes
app.use('/api', globalRoutes);

app.get('/', (_: Request, res: Response) => {
  res.send({ success: true, message: 'Server is UP and RUNNING' });
});

app.use(globalErrorHandler);

export default server;
