import bull from 'bull';
import { redisForBull } from '../../utils/redisClient';
import { contentExplicitValidationAI } from '../content/content.validation';
import { Post } from './post.model';

const postCreationQueue = new bull('postCreationQueue', redisForBull);

postCreationQueue.process(async ({ data }) => {
  const result = await contentExplicitValidationAI(data.content);
  if (result.is_safe === false) {
    await Post.updateOne({ _id: data._id }, { isFlagged: true });
    global.io.emit(`explicit-post-${data._id}`);
  }
});

export default postCreationQueue;
