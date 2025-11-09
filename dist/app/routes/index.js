"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("../modules/user/user.route"));
const antenna_route_1 = __importDefault(require("../modules/antenna/antenna.route"));
const content_route_1 = __importDefault(require("../modules/content/content.route"));
const thread_route_1 = __importDefault(require("../modules/thread/thread.route"));
const post_route_1 = __importDefault(require("../modules/post/post.route"));
const comment_route_1 = __importDefault(require("../modules/comment/comment.route"));
const globalRoutes = express_1.default.Router();
const routes = [
    {
        path: '/auth',
        element: user_route_1.default,
    },
    {
        path: '/antenna',
        element: antenna_route_1.default,
    },
    {
        path: '/thread',
        element: thread_route_1.default,
    },
    {
        path: '/post',
        element: post_route_1.default,
    },
    {
        path: '/comment',
        element: comment_route_1.default,
    },
    {
        path: '/content',
        element: content_route_1.default,
    },
    // Test Routes
];
routes.forEach((route) => globalRoutes.use(route.path, route.element));
exports.default = globalRoutes;
