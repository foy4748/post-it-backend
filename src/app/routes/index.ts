import express from 'express';
import userRoutes from '../modules/user/user.route';

const globalRoutes = express.Router();

const routes = [
  {
    path: '/auth',
    element: userRoutes,
  },
  // Test Routes
];

routes.forEach((route) => globalRoutes.use(route.path, route.element));

export default globalRoutes;
