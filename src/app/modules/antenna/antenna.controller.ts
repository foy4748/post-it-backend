import { connectedUsers } from '../../../app';
import catchAsyncError from '../../utils/catchAsyncError';

// });

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
  global.io
    .to(userId)
    .to(`notifications-${userId}`)
    .emit('notification', notification);

  global.io.emit('notification', notification);

  // Also broadcast to all connected clients (optional)
  // io.emit('notification', notification);

  // console.log(
  //   `📨 Notification sent to user ${userId} at ${Date().toString()}:`,
  //   title,
  // );

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
  userIds.forEach((userId: string) => {
    global.io
      .to(userId)
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
