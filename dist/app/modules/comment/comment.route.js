"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequests_1 = __importDefault(require("../../middlewares/validateRequests"));
const comment_validation_1 = require("./comment.validation");
const comment_controller_1 = require("./comment.controller");
const authentication_1 = __importDefault(require("../../middlewares/authentication"));
const router = express_1.default.Router();
router.post('/:postId', (0, authentication_1.default)(), (0, validateRequests_1.default)(comment_validation_1.commentValidationSchema), comment_controller_1.CcreateComment);
router.get('/:postId', comment_controller_1.CgetComments);
router.get('/:postId/:parentComment', comment_controller_1.CgetNestedComments);
router.delete('/:commentId', (0, authentication_1.default)(), comment_controller_1.CdeleteSingleComment);
exports.default = router;
