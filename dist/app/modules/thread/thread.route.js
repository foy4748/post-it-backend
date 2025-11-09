"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequests_1 = __importDefault(require("../../middlewares/validateRequests"));
const thread_validation_1 = require("./thread.validation");
const thread_controller_1 = require("./thread.controller");
const authentication_1 = __importDefault(require("../../middlewares/authentication"));
const router = express_1.default.Router();
router.post('/', (0, authentication_1.default)(), (0, validateRequests_1.default)(thread_validation_1.threadValidationSchema), thread_controller_1.CcreateThread);
router.post('/category', (0, authentication_1.default)(), (0, validateRequests_1.default)(thread_validation_1.threadCategoryValidationSchema), thread_controller_1.CcreateThreadCategory);
router.get('/category', thread_controller_1.CgetThreadCategories);
router.get('/', thread_controller_1.CgetThreads);
router.get('/:threadId', thread_controller_1.CgetSingleThread);
router.delete('/:threadId', (0, authentication_1.default)(), thread_controller_1.CdeleteSingleThread);
exports.default = router;
