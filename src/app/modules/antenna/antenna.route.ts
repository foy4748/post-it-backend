import { Router } from 'express';
import {
  CgetConnections,
  CnotificationBroadCast,
  CnotificationSend,
} from './antenna.controller';
const router = Router();

// REST API endpoint to send notifications
router.post('/notifications/send', CnotificationSend);

// Send notification to multiple users
router.post('/notifications/broadcast', CnotificationBroadCast);
// Get connected users (admin endpoint)
router.get('/connections', CgetConnections);

export default router;
