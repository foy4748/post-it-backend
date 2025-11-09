import bull from 'bull';
import { redisForBull } from '../../utils/redisClient';
import { contentExplicitValidationAI } from '../content/content.validation';
import { Thread } from './thread.model';

const threadCreationQueue = new bull('threadCreationQueue', redisForBull);

threadCreationQueue.process(async ({ data }) => {
  const result = await contentExplicitValidationAI(
    `${data?.title} ${data?.content}`,
  );
  if (result.is_safe === false) {
    await Thread.updateOne({ _id: data._id }, { isFlagged: true });
    global.io.emit(`explicit-thread-${data._id}`);
  }
});

export default threadCreationQueue;
