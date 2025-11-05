import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { commentValidationSchema } from './comment.validation';
import { CcreateComment, CgetComments } from './comment.controller';
import authentication from '../../middlewares/authentication';
const router = express.Router();

router.post(
  '/:postId',
  validateRequest(commentValidationSchema),
  authentication(),
  CcreateComment,
);

router.get('/:postId', CgetComments);
export default router;
