import cors from 'cors';
import http from 'http';
import express, { Application, Request, Response } from 'express';
import globalRoutes from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandlers';
import cookieParser from 'cookie-parser';
import { createServer } from 'node:http';

const app: Application = express();
const server = createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
  }),
);

// App Routes
app.use('/api', globalRoutes);

app.get('/', (_: Request, res: Response) => {
  res.send({ success: true, message: 'Server is UP and RUNNING' });
});

app.use(globalErrorHandler);

export default server;
