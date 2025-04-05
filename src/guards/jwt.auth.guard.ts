import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entity/user.entity';
import { Request } from 'express';
import { JwtPayload } from '../types/express';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    // if (!authHeader) {
    //   throw new UnauthorizedException('No token provided');
    // }

    // const token = authHeader.split(' ')[1];

    try {
      // const decoded: JwtPayload = this.jwtService.verify(token);

      // const user = await this.userRepository.findOne({
      //   where: { id: decoded.sub, documentNumber: decoded.documentNumber },
      // });

      // if (!user || user.token !== token) {
      //   throw new UnauthorizedException('Invalid or expired token');
      // }

      //request.user = decoded;

      return true;
    } catch (error) {
      console.log('error', error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
