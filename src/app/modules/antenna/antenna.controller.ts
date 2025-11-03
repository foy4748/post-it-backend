import socketIo from 'socket.io';
import server from '../../../app';
import catchAsyncError from '../../utils/catchAsyncError';

// Socket.IO setup with CORS for Next.js frontend
export const io = new socketIo.Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Store connected users (optional)
const connectedUsers = new Map();

// Socket.IO connection handling
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

export const CnotificationSend = catchAsyncError((req, res) => {
  const { userId, title, message, type = 'info', data = {} } = req.body;

  if (!userId || !title) {
    return res.status(400).json({ error: 'userId and title are required' });
  }

  const notification = {
    id: Date.now().toString(),
    userId,
    title,
    message,
    type, // 'info', 'success', 'warning', 'error'
    data,
    timestamp: new Date().toISOString(),
    read: false,
  };

  // Send to specific user room
  io.to(userId)
    .to(`notifications-${userId}`)
    .emit('notification', notification);

  // Also broadcast to all connected clients (optional)
  // io.emit('notification', notification);

  console.log(
    `📨 Notification sent to user ${userId} at ${Date().toString()}:`,
    title,
  );

  res.json({
    success: true,
    message: 'Notification sent',
    notification,
  });
});

export const CnotificationBroadCast = catchAsyncError((req, res) => {
  const { userIds, title, message, type = 'info', data = {} } = req.body;

  const notification = {
    id: Date.now().toString(),
    title,
    message,
    type,
    data,
    timestamp: new Date().toISOString(),
    read: false,
  };

  // Send to multiple users
  userIds.forEach((userId) => {
    io.to(userId)
      .to(`notifications-${userId}`)
      .emit('notification', notification);
  });

  res.json({
    success: true,
    message: `Notification sent to ${userIds.length} users`,
  });
});

export const CgetConnections = catchAsyncError((_, res) => {
  res.json({
    connectedUsers: Array.from(connectedUsers.values()),
    totalConnections: connectedUsers.size,
  });
});
