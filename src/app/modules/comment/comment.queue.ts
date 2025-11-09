import bull from 'bull';
import { redisForBull } from '../../utils/redisClient';
import { contentExplicitValidationAI } from '../content/content.validation';
import { Comment } from './comment.model';

const commentCreationQueue = new bull('commentCreationQueue', redisForBull);

commentCreationQueue.process(async ({ data }) => {
  const result = await contentExplicitValidationAI(data.content);
  if (result.is_safe === false) {
    await Comment.updateOne({ _id: data._id }, { isFlagged: true });
    global.io.emit(`explicit-comment-${data._id}`);
  }
});

export default commentCreationQueue;
