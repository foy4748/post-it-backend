import express from 'express';
import userRoutes from '../modules/user/user.route';
import antennaRoutes from '../modules/antenna/antenna.route';
import contentRoutes from '../modules/content/content.route';
import threadRoutes from '../modules/thread/thread.route';
import postRoutes from '../modules/post/post.route';
import commentRoutes from '../modules/comment/comment.route';

const globalRoutes = express.Router();

const routes = [
  {
    path: '/auth',
    element: userRoutes,
  },
  {
    path: '/antenna',
    element: antennaRoutes,
  },
  {
    path: '/thread',
    element: threadRoutes,
  },
  {
    path: '/post',
    element: postRoutes,
  },
  {
    path: '/comment',
    element: commentRoutes,
  },
  {
    path: '/content',
    element: contentRoutes,
  },
  // Test Routes
];

routes.forEach((route) => globalRoutes.use(route.path, route.element));

export default globalRoutes;
