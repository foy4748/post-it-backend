import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { threadValidationSchema } from './thread.validation';
import { CcreateThread } from './thread.controller';
import authentication from '../../middlewares/authentication';
const router = express.Router();

router.post(
  '/',
  validateRequest(threadValidationSchema),
  authentication(),
  CcreateThread,
);

export default router;
