import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { postValidationSchema } from './post.validation';
import { CcreatePost, CgetPost } from './post.controller';
import authentication from '../../middlewares/authentication';
const router = express.Router();

router.post(
  '/:threadId',
  validateRequest(postValidationSchema),
  authentication(),
  CcreatePost,
);

router.get('/:threadId', CgetPost);
export default router;
