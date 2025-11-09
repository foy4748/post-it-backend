import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { commentValidationSchema } from './comment.validation';
import {
  CcreateComment,
  CdeleteSingleComment,
  CgetComments,
  CgetNestedComments,
} from './comment.controller';
import authentication from '../../middlewares/authentication';
const router = express.Router();

router.post(
  '/:postId',
  authentication(),
  validateRequest(commentValidationSchema),
  CcreateComment,
);

router.get('/:postId', CgetComments);
router.get('/:postId/:parentComment', CgetNestedComments);

router.delete('/:commentId', authentication(), CdeleteSingleComment);
export default router;
