import { Router } from 'express';
import { CSummarize, CmoderatePost } from './content.controller';
const router = Router();

//  Check Content
router.get('/summarize/:id', CSummarize);
router.post('/', CmoderatePost);

export default router;
