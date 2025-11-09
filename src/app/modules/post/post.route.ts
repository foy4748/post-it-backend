import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { postValidationSchema } from './post.validation';
import {
  CcreatePost,
  CdeleteSinglePost,
  CgetPost,
  CgetSinglePost,
} from './post.controller';
import authentication from '../../middlewares/authentication';
const router = express.Router();

router.post(
  '/:threadId',
  validateRequest(postValidationSchema),
  authentication(),
  CcreatePost,
);

router.get('/single-post/:postId', CgetSinglePost);
router.get('/:threadId', CgetPost);

router.delete('/:postId', authentication(), CdeleteSinglePost);

export default router;
