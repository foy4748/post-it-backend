import { JwtPayload } from 'jsonwebtoken';
import { Server as SocketIOServer } from 'socket.io';

declare global {
  namespace Express {
    interface Request {
      decoded: JwtPayload;
    }
  }
  var io: SocketIOServer; // eslint-disable-line no-var
}
