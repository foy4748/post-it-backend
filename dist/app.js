"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectedUsers = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandlers_1 = __importDefault(require("./app/middlewares/globalErrorHandlers"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const config_1 = __importDefault(require("./app/config"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        String(process.env.frontendLink),
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
}));
const server = (0, node_http_1.createServer)(app);
// Socket.IO setup with CORS for Next.js frontend
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ['http://localhost:3000', String(config_1.default.frontendLink)],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    },
    transports: ['websocket', 'polling'],
});
global.io = io;
// Socket.IO connection handling
exports.connectedUsers = new Map();
io.on('connection', (socket) => {
    console.log('🔗 User connected:', socket.id);
    // Join user to a specific room (e.g., user ID)
    socket.on('join-user', (userId) => {
        socket.join(userId);
        exports.connectedUsers.set(socket.id, userId);
        console.log(`User ${userId} joined room`);
    });
    // Join user to a notification room
    socket.on('join-notifications', (userId) => {
        socket.join(`notifications-${userId}`);
    });
    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('❌ User disconnected:', socket.id);
        exports.connectedUsers.delete(socket.id);
    });
    // Handle client errors
    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
});
// App Routes
app.use('/api', routes_1.default);
app.get('/', (_, res) => {
    res.send({ success: true, message: 'Server is UP and RUNNING' });
});
app.use(globalErrorHandlers_1.default);
exports.default = server;
