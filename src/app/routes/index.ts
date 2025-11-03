import express from 'express';
import userRoutes from '../modules/user/user.route';
import antennaRoutes from '../modules/antenna/antenna.route';

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
  // Test Routes
];

routes.forEach((route) => globalRoutes.use(route.path, route.element));

export default globalRoutes;
