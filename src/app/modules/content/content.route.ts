import { Router } from 'express';
import { CSummarize, CmoderatePost } from './content.controller';
import RedisCacheHandler from '../../middlewares/cacheAIResults';
const router = Router();

const cacheHandler = new RedisCacheHandler();

cacheHandler.connect();
//  Check Content
router.get('/summarize/:id', cacheHandler.cacheHandler(), CSummarize);
router.post('/', CmoderatePost);

export default router;
