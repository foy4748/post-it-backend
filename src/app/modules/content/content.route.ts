import { Router } from 'express';
import { CmoderatePost } from './content.controller';
const router = Router();

//  Check Content
router.post('/', CmoderatePost);

export default router;
