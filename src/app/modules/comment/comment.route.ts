import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { commentValidationSchema } from './comment.validation';
import {
  CcreateComment,
  CgetComments,
  CgetNestedComments,
} from './comment.controller';
import authentication from '../../middlewares/authentication';
const router = express.Router();

router.post(
  '/:postId',
  validateRequest(commentValidationSchema),
  authentication(),
  CcreateComment,
);

router.get('/:postId', CgetComments);
router.get('/:postId/:parentComment', CgetNestedComments);
export default router;
