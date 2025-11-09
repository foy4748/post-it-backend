"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const content_controller_1 = require("./content.controller");
const cacheAIResults_1 = __importDefault(require("../../middlewares/cacheAIResults"));
const router = (0, express_1.Router)();
const cacheHandler = new cacheAIResults_1.default();
cacheHandler.connect();
//  Check Content
router.get('/summarize/:id', cacheHandler.cacheHandler(), content_controller_1.CSummarize);
router.post('/', content_controller_1.CmoderatePost);
exports.default = router;
