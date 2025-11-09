"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CgetConnections = exports.CnotificationBroadCast = exports.CnotificationSend = void 0;
const app_1 = require("../../../app");
const catchAsyncError_1 = __importDefault(require("../../utils/catchAsyncError"));
// });
exports.CnotificationSend = (0, catchAsyncError_1.default)((req, res) => {
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
exports.CnotificationBroadCast = (0, catchAsyncError_1.default)((req, res) => {
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
exports.CgetConnections = (0, catchAsyncError_1.default)((_, res) => {
    res.json({
        connectedUsers: Array.from(app_1.connectedUsers.values()),
        totalConnections: app_1.connectedUsers.size,
    });
});
