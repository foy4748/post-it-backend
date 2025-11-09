import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import {
  threadCategoryValidationSchema,
  threadValidationSchema,
} from './thread.validation';
import {
  CcreateThread,
  CcreateThreadCategory,
  CdeleteSingleThread,
  CgetSingleThread,
  CgetThreadCategories,
  CgetThreads,
} from './thread.controller';
import authentication from '../../middlewares/authentication';
const router = express.Router();

router.post(
  '/',
  authentication(),
  validateRequest(threadValidationSchema),
  CcreateThread,
);

router.post(
  '/category',
  authentication(),
  validateRequest(threadCategoryValidationSchema),
  CcreateThreadCategory,
);

router.get('/category', CgetThreadCategories);
router.get('/', CgetThreads);
router.get('/:threadId', CgetSingleThread);

router.delete('/:threadId', CdeleteSingleThread);

export default router;
