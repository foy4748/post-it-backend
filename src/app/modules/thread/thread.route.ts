import express from 'express';
import validateRequest from '../../middlewares/validateRequests';
import {
  threadCategoryValidationSchema,
  threadValidationSchema,
} from './thread.validation';
import {
  CcreateThread,
  CcreateThreadCategory,
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
export default router;
