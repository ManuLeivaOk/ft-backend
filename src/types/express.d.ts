import { JwtPayload } from '../auth/jwt-payload.interface'; // Asegúrate de tener el tipo JwtPayload correctamente importado

export interface JwtPayload {
  sub: number;
  username: string;
  documentNumber: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
