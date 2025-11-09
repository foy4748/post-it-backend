"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const antenna_controller_1 = require("./antenna.controller");
const router = (0, express_1.Router)();
// REST API endpoint to send notifications
router.post('/notifications/send', antenna_controller_1.CnotificationSend);
// Send notification to multiple users
router.post('/notifications/broadcast', antenna_controller_1.CnotificationBroadCast);
// Get connected users (admin endpoint)
router.get('/connections', antenna_controller_1.CgetConnections);
exports.default = router;
