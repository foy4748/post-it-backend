"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisForBull = exports.redisClient = void 0;
const redis_1 = require("redis");
const config_1 = __importDefault(require("../config"));
exports.redisClient = (0, redis_1.createClient)({
    username: config_1.default.redisUser,
    password: config_1.default.redisPassword,
    socket: {
        host: config_1.default.redisHost,
        port: Number(config_1.default.redisPort),
    },
});
exports.redisForBull = {
    redis: {
        username: config_1.default.redisUser,
        password: config_1.default.redisPassword,
        host: config_1.default.redisHost,
        port: Number(config_1.default.redisPort),
    },
};
