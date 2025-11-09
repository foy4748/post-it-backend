"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequests_1 = __importDefault(require("../../middlewares/validateRequests"));
const post_validation_1 = require("./post.validation");
const post_controller_1 = require("./post.controller");
const authentication_1 = __importDefault(require("../../middlewares/authentication"));
const router = express_1.default.Router();
router.post('/:threadId', (0, validateRequests_1.default)(post_validation_1.postValidationSchema), (0, authentication_1.default)(), post_controller_1.CcreatePost);
router.get('/single-post/:postId', post_controller_1.CgetSinglePost);
router.get('/:threadId', post_controller_1.CgetPost);
router.delete('/:postId', (0, authentication_1.default)(), post_controller_1.CdeleteSinglePost);
exports.default = router;
